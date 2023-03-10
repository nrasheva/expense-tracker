import { useState } from 'react';
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
];

export const Expenses = (): JSX.Element => {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
  });

  const handleChange = (key: string, value: string) => {
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
      <p className='bold'>Add new expense</p>
      <input onChange={(e) => handleChange('category', e.target.value)} type='text' value={expense.category} />
      <input onChange={(e) => handleChange('amount', e.target.value)} type='number' value={expense.amount} />
      <button onClick={handleExpense}>Add expense</button>
    </section>
  );
};
