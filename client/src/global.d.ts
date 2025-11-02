interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  order_id?: string;
  receipt?: string;
  handler?: (response: RazorpayPaymentResponse) => void;
}

interface RazorpayInstance {
  open: () => void;
}

interface Razorpay {
  new (options: RazorpayOptions): RazorpayInstance;
}

interface Window {
  Razorpay: Razorpay;
}

