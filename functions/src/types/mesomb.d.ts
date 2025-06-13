declare module '@hachther/mesomb' {
  export class PaymentOperation {
    constructor(config: { applicationKey: string; accessKey: string; secretKey: string });
    makeCollect(data: object): Promise<PaymentResponse>;
    getTransactions(transactionIds: string[]): Promise<TransactionsResponse>;
  }

  export class PaymentResponse {
    isOperationSuccess(): boolean;
    isTransactionSuccess(): boolean;
    getMessage(): string;
    getTransactionId(): string;
    getStatus(): string;
  }

  export class TransactionsResponse {
    isOperationSuccess(): boolean;
    getMessage(): string;
    getTransactions(): Transaction[];
  }

  export interface Transaction {
    getTransactionId(): string;
    getStatus(): string;
  }
} 