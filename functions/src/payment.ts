import { onCall, CallableRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import axios from 'axios';

// Tranzak API configuration
const TRANZAK_API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://dsapi.tranzak.me'
  : 'https://sandbox.dsapi.tranzak.me';

const TRANZAK_APP_ID = process.env.TRANZAK_APP_ID;
const TRANZAK_APP_KEY = process.env.TRANZAK_APP_KEY;

if (!TRANZAK_APP_ID || !TRANZAK_APP_KEY) {
  throw new Error('Tranzak API credentials are not configured');
}

interface PaymentRequest {
  amount: number;
  currency: string;
  service: "MTN" | "ORANGE";
  payer: string;
  description: string;
  type: "SUBSCRIPTION" | "PRODUCT";
  reference: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  products?: Array<{ id: string; name: string; quantity: number; amount: number; category?: string }>;
  subscriptionType?: string | null;
}

interface VerifyPaymentRequest {
  transactionId: string;
}

interface TranzakWebhookData {
  transaction_id: string;
  status: string;
  amount?: number;
  currency?: string;
  network?: string;
  phone_number?: string;
  description?: string;
  external_id?: string;
  timestamp?: string;
}

interface TranzakAccountDetails {
  accountId: string;
  name: string;
  description: string;
  currencyCode: string;
  isActive: boolean;
  type: string;
  totalBalance: number;
  availableBalance: number;
}

interface TranzakResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface TranzakTransaction {
  transaction_id: string;
  status: string;
  amount: number;
  currency: string;
  network: string;
  phone_number: string;
  description: string;
  external_id: string;
  created_at: string;
  updated_at: string;
}

interface TranzakPaginatedResponse<T> extends TranzakResponse<T> {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  hasMore: boolean;
}

interface TranzakWebhookPayload {
  name: string;
  version: string;
  eventType: string;
  appId: string;
  resourceId: string;
  resource: {
    transaction_id: string;
    status: string;
    amount: number;
    currency: string;
    network: string;
    phone_number: string;
    description: string;
    external_id: string;
    created_at: string;
    updated_at: string;
  };
  webhookId: string;
  creationDateTime: string;
  authKey?: string;
}

// Helper function to get Tranzak API token
async function getTranzakToken(): Promise<string> {
  try {
    const response = await axios.post(
      `${TRANZAK_API_URL}/auth/token`,
      {
        appId: TRANZAK_APP_ID,
        appKey: TRANZAK_APP_KEY
      }
    );

    if (!response.data.success || !response.data.data?.token) {
      throw new Error('Failed to get Tranzak API token');
    }

    // Cache token for 1.5 hours (3/4 of the 2-hour validity)
    const token = String(response.data.data.token);
    return token;
  } catch (error) {
    console.error('Error getting Tranzak token:', error);
    throw new Error('Failed to authenticate with Tranzak API');
  }
}

// Helper function to get account details
async function getTranzakAccountDetails(token: string): Promise<TranzakAccountDetails> {
  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-App-ID': TRANZAK_APP_ID || '',
    };

    const response = await axios.get<TranzakResponse<TranzakAccountDetails>>(
      `${TRANZAK_API_URL}/accounts`,
      { headers }
    );

    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to get account details');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error getting account details:', error);
    throw new Error('Failed to get account details from Tranzak API');
  }
}

export const initiatePayment = onCall(async (request: CallableRequest<PaymentRequest>) => {
  const data = request.data;
  const context = request.auth;

  if (!context) {
    throw new Error('Unauthorized');
  }

  try {
    // Get Tranzak API token
    const token = await getTranzakToken();
    
    // Get account details to verify balance
    const accountDetails = await getTranzakAccountDetails(token);
    
    // Verify account is active and has sufficient balance
    if (!accountDetails.isActive) {
      throw new Error('Payment account is not active');
    }
    
    if (accountDetails.availableBalance < data.amount) {
      throw new Error('Insufficient balance in payment account');
    }

    // Create payment record in Firestore
    const paymentRef = admin.firestore().collection('payments').doc();
    const paymentData = {
      userId: context.uid,
      amount: data.amount,
      currency: data.currency,
      service: data.service,
      payer: data.payer,
      description: data.description,
      type: data.type,
      reference: data.reference,
      status: 'PENDING',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      products: data.products,
      subscriptionType: data.subscriptionType,
      accountId: accountDetails.accountId,
    };

    await paymentRef.set(paymentData);

    // Tranzak Collect API Call
    const tranzakRequestBody = {
      amount: data.amount,
      currency: data.currency,
      network: data.service,
      phone_number: data.payer,
      description: data.description,
      external_id: data.reference,
      callback_url: `${process.env.FUNCTIONS_BASE_URL}/payment/webhook`,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      account_id: accountDetails.accountId,
    };

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-App-ID': TRANZAK_APP_ID || '',
    };

    const response = await axios.post<TranzakResponse<{ transaction_id: string }>>(
      `${TRANZAK_API_URL}/collect`,
      tranzakRequestBody,
      { headers }
    );

    // Check success field in response
    if (!response.data.success) {
      throw new Error(response.data.message || 'Payment initiation failed');
    }

    if (!response.data.data?.transaction_id) {
      throw new Error('No transaction ID received from payment service');
    }

    await paymentRef.update({
      transactionId: response.data.data.transaction_id,
      status: 'INITIATED',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      success: true,
      transactionId: response.data.data.transaction_id,
      message: 'Payment initiated successfully',
    };
  } catch (error) {
    console.error('Payment initiation error:', error);
    if (error instanceof axios.AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(`Payment initiation failed: ${errorMessage}`);
    }
    throw new Error('Failed to initiate payment: Unknown error');
  }
});

export const verifyPayment = onCall(async (request: CallableRequest<VerifyPaymentRequest>) => {
  const data = request.data;
  const context = request.auth;

  if (!context) {
    throw new Error('Unauthorized');
  }

  try {
    // Get payment record
    const paymentSnapshot = await admin
      .firestore()
      .collection('payments')
      .where('transactionId', '==', data.transactionId)
      .where('userId', '==', context.uid)
      .limit(1)
      .get();

    if (paymentSnapshot.empty) {
      throw new Error('Payment not found');
    }

    const paymentDoc = paymentSnapshot.docs[0];
    const paymentData = paymentDoc.data();

    // Get Tranzak API token
    const token = await getTranzakToken();

    // Verify payment status with Tranzak
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-App-ID': TRANZAK_APP_ID || '',
    };

    const response = await axios.get<TranzakResponse<{
      transaction_id: string;
      status: string;
      amount: number;
      currency: string;
      network: string;
      phone_number: string;
      description: string;
      external_id: string;
      created_at: string;
      updated_at: string;
    }>>(
      `${TRANZAK_API_URL}/transactions/${data.transactionId}`,
      { headers }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to verify payment status');
    }

    const transactionData = response.data.data;
    let status = 'PENDING';

    // Map Tranzak status to our internal status
    switch (transactionData.status?.toUpperCase()) {
      case 'SUCCESSFUL':
        status = 'SUCCESS';
        break;
      case 'FAILED':
        status = 'FAILED';
        break;
      case 'CANCELLED':
        status = 'CANCELLED';
        break;
      case 'PAYMENT_IN_PROGRESS':
        status = 'PENDING';
        break;
      case 'PAYER_REDIRECT_REQUIRED':
        status = 'PENDING';
        break;
      default:
        status = 'PENDING';
    }

    // Update payment status
    await paymentDoc.ref.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      transactionDetails: transactionData,
    });

    return {
      success: true,
      status,
      message: 'Payment status verified successfully',
      transactionDetails: transactionData,
    };
  } catch (error) {
    console.error('Payment verification error:', error);
    if (error instanceof axios.AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(`Payment verification failed: ${errorMessage}`);
    }
    throw new Error('Failed to verify payment: Unknown error');
  }
});

export const paymentWebhook = onRequest(async (req, res) => {
  try {
    const payload = req.body as TranzakWebhookPayload;

    // Verify webhook payload
    if (!payload || !payload.resourceId || !payload.resource) {
      throw new Error('Invalid webhook payload');
    }

    // Verify auth key if configured
    if (process.env.TRANZAK_WEBHOOK_AUTH_KEY && payload.authKey !== process.env.TRANZAK_WEBHOOK_AUTH_KEY) {
      throw new Error('Invalid webhook authentication');
    }

    // Get payment record
    const paymentSnapshot = await admin
      .firestore()
      .collection('payments')
      .where('transactionId', '==', payload.resourceId)
      .limit(1)
      .get();

    if (paymentSnapshot.empty) {
      throw new Error('Payment not found');
    }

    const paymentDoc = paymentSnapshot.docs[0];
    let status = 'PENDING';

    // Map Tranzak status to our internal status
    switch (payload.resource.status?.toUpperCase()) {
      case 'SUCCESSFUL':
        status = 'SUCCESS';
        break;
      case 'FAILED':
        status = 'FAILED';
        break;
      case 'CANCELLED':
        status = 'CANCELLED';
        break;
      case 'PAYMENT_IN_PROGRESS':
        status = 'PENDING';
        break;
      case 'PAYER_REDIRECT_REQUIRED':
        status = 'PENDING';
        break;
      default:
        status = 'PENDING';
    }

    // Update payment status
    await paymentDoc.ref.update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      transactionDetails: payload.resource,
      webhookReceived: true,
      webhookData: payload,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(400).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

function verifyWebhookSignature(data: TranzakWebhookData, signature: string): boolean {
  // Implement Tranzak webhook signature verification
  // This is a placeholder - implement according to Tranzak's documentation
  return true;
}

function calculateSubscriptionEndDate(subscriptionType: string | null): admin.firestore.Timestamp {
  const now = new Date();
  let months = 1; // Default to 1 month

  if (subscriptionType) {
    const match = subscriptionType.match(/(\d+)MONTH/);
    if (match) {
      months = parseInt(match[1], 10);
    }
  }

  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + months);
  return admin.firestore.Timestamp.fromDate(endDate);
}