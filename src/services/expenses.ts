import { instance } from '@/axios';
import type { CreateExpense, Expense } from '@/types/expenses';

export const createExpenses = async (expense: CreateExpense) => {
  return await instance.post('/expenses', expense);
};

export const getExpenses = async () => {
  const { data } = await instance.get<Expense[]>('/expenses?from=750121200&to=1704060000');
  return { expenses: data };
};
