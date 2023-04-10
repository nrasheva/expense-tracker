import { useEffect, useMemo, useState } from 'react';
import styles from './Expenses.module.scss';
import { createExpenses, getExpenses } from '@/services/expenses';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setExpenses } from '@/redux/reducers/expenses';
import { formatCurrency, formatTimestamp } from '@/tools';

export const Expenses = (): JSX.Element => {
  const [view, setView] = useState<'detailed' | 'grouped'>('grouped');

  const categories = useAppSelector((state) => state.categories.categories);
  const expenses = useAppSelector((state) => state.expenses.expenses);

  const dispatch = useAppDispatch();

  const groupedExpenses = useMemo(() => {
    const groups = expenses.reduce((accumulator: { [key: number]: number[] }, { amount, category }) => {
      accumulator[category] = accumulator[category] ?? [];
      accumulator[category].push(amount);

      return accumulator;
    }, {});

    const grouped = [];

    for (const group in groups) {
      const newGroup = {
        amount: groups[group].reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        group: group,
      };

      grouped.push(newGroup);
    }

    return grouped;
  }, [expenses]);

  useEffect(() => {
    (async () => {
      try {
        const { expenses } = await getExpenses();

        dispatch(setExpenses(expenses));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const getCategoryName = (categoryId: number): string => {
    const i = categories.findIndex((category) => category.id === categoryId);
    return categories[i].name;
  };

  return (
    <section>
      <table className={styles.table}>
        {expenses.map((expense) => {
          return (
            <tr key={expense.id}>
              <td>{getCategoryName(expense.category)}</td>
              <td>{formatTimestamp(expense.timestamp)}</td>
              <td>{expense.location}</td>
              <td>{formatCurrency(expense.amount, expense.currency)}</td>
            </tr>
          );
        })}
      </table>
      {expenses.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) / 100}
      <CreateExpense />
    </section>
  );
};

const CreateExpense = (): JSX.Element => {
  const [amount, setAmount] = useState('0');
  const [date, setDate] = useState('2023-04-01');
  const [time, setTime] = useState('00:00');

  const handleExpense = async () => {
    const dateTime = `${date}T${time}`;
    const timestamp = new Date(dateTime);

    const unix = timestamp.getTime() / 1000;

    const expense = {
      account: 3,
      amount: Number(amount),
      category: 6,
      currency: 'BGN',
      location: 5,
      timestamp: unix,
    };

    // await createExpenses(expense);
  };

  return (
    <section className={styles['create-expense']}>
      <input onChange={(e) => setAmount(e.target.value)} placeholder='Amount' type='number' value={amount} />
      <div>
        <input onChange={(e) => setDate(e.target.value)} type='date' value={date} />
        <input onChange={(e) => setTime(e.target.value)} type='time' value={time} />
      </div>
      <button className='filled' onClick={handleExpense}>
        Create expense
      </button>
    </section>
  );
};
