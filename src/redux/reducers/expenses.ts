import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '@/types/expenses';

type ExpensesState = {
  expenses: Expense[];
};

const initialState: ExpensesState = {
  expenses: [],
};

export const expensesSlice = createSlice({
  initialState,
  name: 'expenses',
  reducers: {
    resetExpenses: () => initialState,
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
  },
});

export const { resetExpenses, setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
