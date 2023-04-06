export type Account = {
  balance: number;
  color: string;
  default: boolean;
  currency: string;
  id: string;
  name: string;
  type: 'cash' | 'checking' | 'investments' | 'savings';
};
