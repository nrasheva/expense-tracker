import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  devTools: { trace: true, traceLimit: 25 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
