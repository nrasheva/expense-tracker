import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Account } from '@/types/accounts';

type AccountsState = {
  accounts: Account[];
};

const initialState: AccountsState = {
  accounts: [],
};

export const accountsSlice = createSlice({
  initialState,
  name: 'accounts',
  reducers: {
    resetAccounts: () => initialState,
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const { resetAccounts, setAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
