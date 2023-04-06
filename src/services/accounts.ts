import { instance } from '@/axios';
import type { Account } from '@/types/accounts';

export const getAccounts = async () => {
  const { data } = await instance.get<Account[]>('/accounts');
  return { accounts: data };
};
