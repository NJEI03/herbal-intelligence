import { getFunctions, httpsCallable, HttpsCallableOptions } from 'firebase/functions';
import { functions } from './firebase'; // Import your Firebase functions instance

interface PaymentData {
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

interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
}

interface PaymentStatus {
  success: boolean;
  status: string;
  message: string;
  transactionDetails?: any;
}

// Force 1st Gen deployment configuration
const gen1Config: HttpsCallableOptions = {};

export const initiatePayment = async (data: PaymentData): Promise<PaymentResponse> => {
  try {
    console.log('Initiating payment with data:', {
      ...data,
      payer: data.payer,
    });

    const initiatePaymentFunction = httpsCallable<PaymentData, PaymentResponse>(functions, 'initiatePayment', gen1Config);
    const result = await initiatePaymentFunction(data);
    
    console.log('Payment initiation result:', result.data);
    
    if (!result.data.success) {
      throw new Error(result.data.message || 'Payment initiation failed');
    }
    
    return result.data;
  } catch (error: any) {
    console.error('Payment initiation error:', error);
    
    const errorMessage = error?.message || 
      (error?.data?.message) || 
      'Failed to initiate payment. Please try again.';
    
    throw new Error(errorMessage);
  }
};

export const pollPaymentStatus = async (
  transactionId: string,
  onSuccess: () => void,
  onError: (error: string) => void,
  onStatusChange: (status: string) => void
) => {
  try {
    const verifyPaymentFunction = httpsCallable<{ transactionId: string }, PaymentStatus>(functions, 'verifyPayment', gen1Config);
    const maxAttempts = 12; // 2 minutes with 10-second intervals
    let attempts = 0;
    let lastStatus = '';

    const poll = async () => {
      if (attempts >= maxAttempts) {
        onError('Payment verification timed out. Please check your payment status.');
        return;
      }

      try {
        const result = await verifyPaymentFunction({ transactionId });
        const response = result.data;

        if (!response.success) {
          onError(response.message || 'Failed to verify payment status');
          return;
        }

        // Only trigger status change if it's different from the last status
        if (response.status !== lastStatus) {
          lastStatus = response.status;
          onStatusChange(response.status);
        }

        switch (response.status) {
          case 'SUCCESS':
            onSuccess();
            return;
          case 'FAILED':
          case 'CANCELLED':
            onError(response.message || `Payment ${response.status.toLowerCase()}`);
            return;
          case 'PENDING':
          case 'INITIATED':
            // Continue polling
            attempts++;
            setTimeout(poll, 10000); // Poll every 10 seconds
            break;
          default:
            console.warn('Unknown payment status:', response.status);
            attempts++;
            setTimeout(poll, 10000);
        }
      } catch (error: any) {
        console.error('Polling error:', error);
        onError(error.message || 'Failed to verify payment status.');
      }
    };

    await poll();
  } catch (error: any) {
    console.error('Payment polling error:', error);
    onError(error.message || 'Failed to start payment verification.');
  }
};
