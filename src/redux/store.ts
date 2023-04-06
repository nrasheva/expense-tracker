import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './reducers/accounts';
import userSlice from './reducers/user';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    user: userSlice,
  },
  devTools: { trace: true, traceLimit: 25 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
