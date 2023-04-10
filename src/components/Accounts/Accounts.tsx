import { useEffect } from 'react';
import styles from './Accounts.module.scss';
import { getAccounts } from '@/services/accounts';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setAccounts } from '@/redux/reducers/accounts';
import { formatCurrency } from '@/tools';

export const Accounts = () => {
  const accounts = useAppSelector((state) => state.accounts.accounts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { accounts } = await getAccounts();

        dispatch(setAccounts(accounts));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className={styles['accounts-container']}>
        {accounts.map((account) => {
          return (
            <div className={styles.account} key={account.id} style={{ backgroundColor: account.color }}>
              <h2 className='white'>{account.name}</h2>
              <h1 className='white'>{formatCurrency(account.balance, account.currency)}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};
