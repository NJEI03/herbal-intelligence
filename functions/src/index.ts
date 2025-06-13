import * as admin from 'firebase-admin';
import { initiatePayment, verifyPayment } from './payment';

// Initialize Firebase Admin only if it hasn't been initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

// Export all functions
export {
  initiatePayment,
  verifyPayment
}; 