// DO NOT IMPORT THIS FILE, import the index.ts instead

// Since stripe-react-native is not available on web, this just has non-functioning
// placeholders

import { PropsWithChildren } from "react";

type StripeProviderProps = {
  publishableKey: string;
  merchantIdentifier?: string;
  handleURLCallback?: (url: string) => boolean;
  resetPaymentSheetCustomer?: () => Promise<null>;
};

export const StripeProvider = ({
  publishableKey,
  merchantIdentifier,
  handleURLCallback,
  resetPaymentSheetCustomer,
  children,
}: PropsWithChildren<StripeProviderProps>) => {
  return <>{children}</>;
};

type StripeHook = () => {
  initPaymentSheet: (context: any) => Promise<{ error: any }>;
  presentPaymentSheet: () => Promise<{ error: any }>;
  handleURLCallback: (url: string) => Promise<boolean>;
  resetPaymentSheetCustomer: () => Promise<null>;
};

export const useStripe: StripeHook = () => ({
  initPaymentSheet: async (context: any) => ({ error: null }),
  presentPaymentSheet: async () => ({ error: null }),
  handleURLCallback: (url: string) => Promise.resolve(false),
  resetPaymentSheetCustomer: () => Promise.resolve(null),
});
