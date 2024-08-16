export type CarbonCredit = {
  id: string;
  name: string;
  image: string;
  colors: string[];
  price: number;
  details: {
    title: string;
    content: string;
  }[];
  registry: {
    title: string;
    link: string;
  }[];
  CTA: string;
  type: string;
};

export type CartItem = { quantity: number } & CarbonCredit;

export type Coin = { coins: number; price: number };
