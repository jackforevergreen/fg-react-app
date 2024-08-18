// DO NOT IMPORT THIS FILE, import the index.ts instead

// Since stripe-react-native is not available on web, this just has non-functioning
// placeholders

import { PropsWithChildren } from "react";

type StripeProviderProps = {
  publishableKey: string;
  merchantIdentifier?: string;
};

export const StripeProvider = ({
  publishableKey,
  merchantIdentifier,
  children,
}: PropsWithChildren<StripeProviderProps>) => {
  return <>{children}</>;
};

type StripeHook = () => {
  initPaymentSheet: (context: any) => Promise<{ error: any }>;
  presentPaymentSheet: () => Promise<{ error: any }>;
};

export const useStripe: StripeHook = () => ({
  initPaymentSheet: async (context: any) => ({ error: null }),
  presentPaymentSheet: async () => ({ error: null }),
});
