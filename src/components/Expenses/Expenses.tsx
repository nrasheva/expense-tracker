import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { formatCurrency, formatTimestamp } from '../../tools';

type Expense = {
  amount: number;
  category: string;
  id: string;
  timestamp: number;
};

const EXPENSES: Expense[] = [
  {
    amount: 999,
    category: 'others',
    id: 'f2ce6609-98ce-425f-96a8-d3cb38dcf389',
    timestamp: 1678269960,
  },
  {
    amount: 1777,
    category: 'groceries',
    id: '36945150-162d-42ea-bfdc-b924c3b95240',
    timestamp: 1678299420,
  },
  {
    amount: 1100,
    category: 'food',
    id: '77128142-1969-402a-ae5e-1c642da0cc7d',
    timestamp: 1678355880,
  },
  {
    amount: 2541,
    category: 'vitamins',
    id: '68de53e7-8809-41d0-96a1-bf1c6f20e542',
    timestamp: 1678382280,
  },
  {
    amount: 40000,
    category: 'rent',
    id: '6b568204-2927-4568-92e2-bf57985adc40',
    timestamp: 1678429080,
  },
  {
    amount: 2500,
    category: 'utilities',
    id: 'c7ede4db-e0c2-4b88-b069-10510d8babd4',
    timestamp: 1678429080,
  },
  {
    amount: 100,
    category: 'commissions',
    id: '7b391ac2-2f48-41c4-912e-32a7a7b0fc6e',
    timestamp: 1678429080,
  },
  {
    amount: 1425,
    category: 'groceries',
    id: '11b8b79c-2eb2-4db3-b65f-1ea2006f6e1e',
    timestamp: 1678460160,
  },
  {
    amount: 260,
    category: 'groceries',
    id: 'c0b5d8b9-1c67-4cef-bfa7-e7eed9c1b509',
    timestamp: 1678461060,
  },
  {
    amount: 548,
    category: 'groceries',
    id: '59ee99f6-6cf8-42c6-b708-4e2b3f78c3cf',
    timestamp: 1678517760,
  },
  {
    amount: 2176,
    category: 'groceries',
    id: '8aa9bee8-9606-441c-bb61-2b8a95da842a',
    timestamp: 1678531320,
  },
  {
    amount: 2862,
    category: 'groceries',
    id: '4ca43b21-650f-44d9-b96b-555627e81416',
    timestamp: 1678620600,
  },
  {
    amount: 1756,
    category: 'groceries',
    id: '1a6fbb68-0a9e-4642-b957-1d6b4b9e56d2',
    timestamp: 1678712940,
  },
  {
    amount: 249,
    category: 'groceries',
    id: '20c60534-804d-474d-9c51-bc465b18d2bf',
    timestamp: 1678807020,
  },
  {
    amount: 2365,
    category: 'groceries',
    id: 'c9521ed0-197d-4d2f-ab6b-49b9584f1b6a',
    timestamp: 1678900980,
  },
  {
    amount: 1089,
    category: 'vitamins',
    id: '299f910a-9693-40b5-b008-30abd600d2e9',
    timestamp: 1678985880,
  },
  {
    amount: 1232,
    category: 'groceries',
    id: '61c9d440-eee9-41bc-b6b8-b03f8d77609c',
    timestamp: 1678987080,
  },
  {
    amount: 2800,
    category: 'going-out',
    id: '2f040155-2e82-4117-b835-cf8bee24e728',
    timestamp: 1679091000,
  },
  {
    amount: 2000,
    category: 'going-out',
    id: '75ad0193-1518-45e9-adb9-eb8510df014e',
    timestamp: 1679092200,
  },
  {
    amount: 1200,
    category: 'going-out',
    id: 'd606641d-1c99-407f-97bd-f0f18ff456ce',
    timestamp: 1679093160,
  },
  {
    amount: 4000,
    category: 'going-out',
    id: 'e8730623-1561-4c7a-a4d3-e4d9e3dfbf78',
    timestamp: 1679098740,
  },
  {
    amount: 657,
    category: 'groceries',
    id: '83b3eed9-7352-490f-af62-212705caf18e',
    timestamp: 1679137380,
  },
  {
    amount: 300,
    category: 'commissions',
    id: 'e44db2df-74c3-4ac1-835e-5a33c7d32afa',
    timestamp: 1679355180,
  },
  {
    amount: 139,
    category: 'groceries',
    id: '710620a8-6e59-4b87-93a0-b14b1178efc8',
    timestamp: 1679383800,
  },
  {
    amount: 5000,
    category: 'multisport',
    id: 'aa4f703c-039e-41fd-aff0-e347a9d6efa5',
    timestamp: 1679384640,
  },
  {
    amount: 1106,
    category: 'groceries',
    id: '3a5e7579-6d6e-4c45-bae7-73bbfb228e3a',
    timestamp: 1679504820,
  },
  {
    amount: 1500,
    category: 'revolut',
    id: '650214d0-a413-4ee1-9895-4e87b2f6f9d1',
    timestamp: 1679589060,
  },
  {
    amount: 2900,
    category: 'going-out',
    id: 'ac7585b3-be89-478f-a4f6-562b1a4ff832',
    timestamp: 1679603580,
  },
  {
    amount: 1089,
    category: 'vitamins',
    id: '306fbc36-8561-4eff-ad64-30735079ff9f',
    timestamp: 1679643960,
  },
  {
    amount: 1300,
    category: 'food',
    id: '1b9518a2-9734-4a89-a527-fd72c067ea55',
    timestamp: 1679654040,
  },
  {
    amount: 8000,
    category: 'car',
    id: '78535a6b-f4bf-48d5-ae33-509ee31f0e37',
    timestamp: 1679733300,
  },
  {
    amount: 43733,
    category: 'hotels',
    id: '32918ad2-382c-4f3b-9df8-453f83ad3463',
    timestamp: 1679780700,
  },
  {
    amount: 1480,
    category: 'food',
    id: 'fa1983bd-f21d-41aa-ba75-e5c9fde668e3',
    timestamp: 1679850360,
  },
  {
    amount: 1300,
    category: 'food',
    id: 'c3531cc3-1313-41cf-9e46-20a9a6c3d65a',
    timestamp: 1679915340,
  },
  {
    amount: 940,
    category: 'groceries',
    id: '8c55483d-ce0b-4192-8293-89ac0e707f58',
    timestamp: 1680000840,
  },
  {
    amount: 1168,
    category: 'groceries',
    id: '55a7fd31-8088-487d-9e13-484890393328',
    timestamp: 1680007560,
  },
  {
    amount: 2343,
    category: 'vacations',
    id: 'ef429070-b153-4cee-9123-667f19db6e21',
    timestamp: 1680075120,
  },
  {
    amount: 2966,
    category: 'vacations',
    id: '34aa3f00-db80-4784-b531-f7ed6dc807e9',
    timestamp: 1680178680,
  },
  {
    amount: 979,
    category: 'vacations',
    id: '709f9715-d4e3-43b0-a2ea-2d09c41c0f74',
    timestamp: 1680286200,
  },
  {
    amount: 15300,
    category: 'hosting',
    id: '9f54f2cc-d6da-4aa2-b563-dc9f1fca1fed',
    timestamp: 1680333660,
  },
  {
    amount: 1709,
    category: 'vacations',
    id: 'd1b19f40-88b7-4713-930c-9e10d7a15570',
    timestamp: 1680359580,
  },
  {
    amount: 1500,
    category: 'food',
    id: 'afc65bf9-a25a-40a8-8aee-68f5bb9ed30a',
    timestamp: 1680440040,
  },
  {
    amount: 1613,
    category: 'groceries',
    id: '3df8db39-b35a-450c-ac33-f06e6b569562',
    timestamp: 1680515760,
  },
];

export const Expenses = (): JSX.Element => {
  const [view, setView] = useState<'detailed' | 'grouped'>('grouped');
  const [expenses, setExpenses] = useState(EXPENSES);
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
  });

  const categories = useAppSelector((state) => state.user.categories);

  const groupedExpenses = useMemo(() => {
    const groups = expenses.reduce((accumulator: { [key: string]: number[] }, { amount, category }) => {
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
  }, []);

  const handleChange = (key: string, value: string): void => {
    setExpense((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const handleExpense = (): void => {
    const newExpense: Expense = {
      amount: Number(expense.amount),
      category: expense.category,
      id: Math.floor(new Date().getTime() / 1000.0).toString(),
      timestamp: Math.floor(new Date().getTime() / 1000.0),
    };

    setExpenses([...expenses, newExpense]);
  };

  return (
    <section>
      <button onClick={() => setView(view === 'detailed' ? 'grouped' : 'detailed')}>
        {view === 'detailed' ? 'grouped' : 'detailed'}
      </button>
      {view === 'detailed' ? (
        expenses.map((expense) => {
          return (
            <div className='expense' key={expense.id}>
              <span>{expense.category}</span>
              <span>{formatTimestamp(expense.timestamp)}</span>
              <span>{formatCurrency(expense.amount.toString())}</span>
            </div>
          );
        })
      ) : (
        <>
          {groupedExpenses.map((expense) => {
            return (
              <div className='expense' key={expense.group}>
                <span>{expense.group}</span>
                <span>{formatCurrency(expense.amount.toString())}</span>
              </div>
            );
          })}
        </>
      )}

      {expenses.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) / 100}
      <p className='bold'>Add new expense</p>
      <label htmlFor='categories'>Choose a category</label>
      <select id='categories' onChange={(e) => handleChange('category', e.target.value)}>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
      <input onChange={(e) => handleChange('amount', e.target.value)} type='number' value={expense.amount} />
      <button onClick={handleExpense}>Add expense</button>
    </section>
  );
};
