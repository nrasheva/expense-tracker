import { useEffect, useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Categories, Expenses } from './components/_index';
import { add, differenceInDays, isBefore, startOfDay } from 'date-fns';

function App() {
  const [account, setAccount] = useState('');
  const [selectedDate, setSelectedDate] = useState(1);
  const [checked, setChecked] = useState(false);
  const [nextIncome, setNextIncome] = useState('');
  const [remainingDays, setRemainingDays] = useState('');
  const [savings, setSavings] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const savedAccount = localStorage.getItem('account');

    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);

  const handleAccount = (amount: string): void => {
    setAccount(amount);
    localStorage.setItem('account', amount);
  };

  const handleConfirmation = (): void => {
    // Get midnight UTC date of user selection
    const today = startOfDay(new Date());
    const incomeDay = startOfDay(new Date().setDate(Number(selectedDate)));

    let nextIncome = incomeDay;

    if (checked) {
      nextIncome = add(incomeDay, {
        months: 1,
      });
    } else if (!checked && isBefore(incomeDay, today)) {
      setNextIncome('Income not received by selected date');
      return;
    }

    setNextIncome(nextIncome.toString());

    const difference = differenceInDays(nextIncome, today);
    const message = `${difference} remaining ${difference > 1 ? 'days' : 'day'}`;

    setRemainingDays(message);
  };

  return (
    <Provider store={store}>
      <div className='app'>
        <div className='column'>
          <div>
            <h3>Account</h3>
            <input min='1' onChange={(e) => handleAccount(e.target.value)} step='any' type='number' value={account} />
          </div>
          <div>
            <p className='bold'>What day do you get paid?</p>
            <input
              max='31'
              min='1'
              onChange={(e) => setSelectedDate(Number(e.target.value))}
              type='number'
              value={selectedDate}
            />
            <button onClick={handleConfirmation}>Confirm</button>
            <input
              checked={checked}
              id='received'
              onChange={(e) => setChecked(e.target.checked)}
              type='checkbox'
            ></input>
            <label htmlFor='received'>Received for current period</label>
          </div>
          {Boolean(remainingDays.length) && <h2>{remainingDays}</h2>}
          {nextIncome}
          <div>
            <p className='bold'>How much do you want to save?</p>
            <input min='1' onChange={(e) => setSavings(e.target.value)} step='any' type='number' value={savings} />
          </div>
          {Number(savings) / Number(remainingDays.split(' ')[0])}
          <Expenses />
        </div>
        <div className='column'>
          <Categories />
        </div>
      </div>
    </Provider>
  );
}

export default App;
