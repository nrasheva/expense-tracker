export type CreateExpense = {
  account: number;
  amount: number;
  category: number;
  currency: string;
  location: number;
  timestamp: number;
};

export type Expense = {
  account: number;
  amount: number;
  category: number;
  currency: string;
  id: number;
  location: number;
  timestamp: number;
};
