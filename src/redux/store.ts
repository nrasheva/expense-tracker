import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './reducers/accounts';
import categoriesSlice from './reducers/categories';
import expensesSlice from './reducers/expenses';
import userSlice from './reducers/user';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    categories: categoriesSlice,
    expenses: expensesSlice,
    user: userSlice,
  },
  devTools: { trace: true, traceLimit: 25 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
