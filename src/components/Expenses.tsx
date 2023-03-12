import { useState } from 'react';
import { useAppSelector } from '../hooks';
import { convertTimestamp, formatCurrency } from '../tools';

type Expense = {
  amount: string;
  category: string;
  id: string;
  timestamp: number;
};

const EXPENSES: Expense[] = [
  {
    amount: '999',
    category: 'others',
    id: 'f2ce6609-98ce-425f-96a8-d3cb38dcf389',
    timestamp: 1678269960,
  },
  {
    amount: '1777',
    category: 'groceries',
    id: '36945150-162d-42ea-bfdc-b924c3b95240',
    timestamp: 1678299420,
  },
  {
    amount: '1100',
    category: 'food',
    id: '77128142-1969-402a-ae5e-1c642da0cc7d',
    timestamp: 1678355880,
  },
  {
    amount: '2541',
    category: 'vitamins',
    id: '68de53e7-8809-41d0-96a1-bf1c6f20e542',
    timestamp: 1678382280,
  },
  {
    amount: '40000',
    category: 'rent',
    id: '6b568204-2927-4568-92e2-bf57985adc40',
    timestamp: 1678429080,
  },
  {
    amount: '2500',
    category: 'utilities',
    id: 'c7ede4db-e0c2-4b88-b069-10510d8babd4',
    timestamp: 1678429080,
  },
  {
    amount: '100',
    category: 'commissions',
    id: '7b391ac2-2f48-41c4-912e-32a7a7b0fc6e',
    timestamp: 1678429080,
  },
  {
    amount: '1425',
    category: 'groceries',
    id: '11b8b79c-2eb2-4db3-b65f-1ea2006f6e1e',
    timestamp: 1678460160,
  },
  {
    amount: '260',
    category: 'groceries',
    id: 'c0b5d8b9-1c67-4cef-bfa7-e7eed9c1b509',
    timestamp: 1678461060,
  },
  {
    amount: '548',
    category: 'groceries',
    id: '59ee99f6-6cf8-42c6-b708-4e2b3f78c3cf',
    timestamp: 1678517760,
  },
  {
    amount: '2176',
    category: 'groceries',
    id: '8aa9bee8-9606-441c-bb61-2b8a95da842a',
    timestamp: 1678531320,
  },
  {
    amount: '2176',
    category: 'groceries',
    id: 'a04108b7-540f-497b-bcfd-fc4386ac15aa',
    timestamp: 1678531320,
  },
  {
    amount: '2862',
    category: 'groceries',
    id: '4ca43b21-650f-44d9-b96b-555627e81416',
    timestamp: 1678620600,
  },
];

export const Expenses = (): JSX.Element => {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
  });

  const categories = useAppSelector((state) => state.user.categories);

  const handleChange = (key: string, value: string): void => {
    setExpense((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const handleExpense = (): void => {
    const newExpense: Expense = {
      amount: expense.amount,
      category: expense.category,
      id: Math.floor(new Date().getTime() / 1000.0).toString(),
      timestamp: Math.floor(new Date().getTime() / 1000.0),
    };

    setExpenses([...expenses, newExpense]);
  };

  return (
    <section>
      <h3>Expenses</h3>
      {expenses.map((expense) => {
        return (
          <div className='expense' key={expense.id}>
            <span>{expense.category}</span>
            <span>{convertTimestamp(expense.timestamp)}</span>
            <span>{formatCurrency(expense.amount)}</span>
          </div>
        );
      })}

      {expenses.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0) / 100}
      <p className='bold'>Add new expense</p>
      <label htmlFor='categories'>Choose a category</label>
      <select id='categories' onChange={(e) => handleChange('category', e.target.value)}>
        {categories.map((category) => {
          return <option key={category.id} value={category.id}>{category.name}</option>;
        })}
      </select>
      <input onChange={(e) => handleChange('amount', e.target.value)} type='number' value={expense.amount} />
      <button onClick={handleExpense}>Add expense</button>
    </section>
  );
};
