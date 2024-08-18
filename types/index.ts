type CarbonCredit = {
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

type CartItem = { 
  id: string;
  quantity: number;
};

interface TransactionItem {
  id: string;
  quantity: number;
  price: number;
}

interface Transaction {
  id: string;
  items: TransactionItem[];
  totalAmount: number;
  purchaseDate: string;
}

export { CarbonCredit, CartItem, TransactionItem, Transaction };
