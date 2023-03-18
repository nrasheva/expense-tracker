import { useState } from 'react';
import { add, differenceInDays, isBefore, startOfDay } from 'date-fns';

const TYPES = ['cash', 'checking', 'investments', 'savings'];

export const Accounts = () => {
  const [account, setAccount] = useState({
    balance: 0,
    name: '',
    type: '',
  });

  const [selectedDate, setSelectedDate] = useState(1);
  const [checked, setChecked] = useState(false);
  const [nextIncome, setNextIncome] = useState('');
  const [remainingDays, setRemainingDays] = useState('');
  const [savings, setSavings] = useState('');

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

  const handleChange = (key: string, value: string): void => {
    setAccount((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const handleAccount = (): void => {
    const newAccount = {
      balance: account.balance,
      name: account.name,
      type: account.type,
    };

    console.log(newAccount);
    setAccount({
      balance: 0,
      name: '',
      type: '',
    });
  };

  return (
    <div>
      <p className='bold'>Create account</p>
      <input
        min='1'
        onChange={(e) => handleChange('balance', e.target.value)}
        step='any'
        type='number'
        value={account.balance}
      />
      <input onChange={(e) => handleChange('name', e.target.value)} type='text' value={account.name} />
      <label htmlFor='account-type'>Choose type</label>
      <select id='account-type' onChange={(e) => handleChange('type', e.target.value)}>
        {TYPES.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>
      <button onClick={handleAccount}>Create account</button>
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
        <input checked={checked} id='received' onChange={(e) => setChecked(e.target.checked)} type='checkbox'></input>
        <label htmlFor='received'>Received for current period</label>
      </div>
      {Boolean(remainingDays.length) && <h2>{remainingDays}</h2>}
      {nextIncome}
      <div>
        <p className='bold'>How much do you want to save?</p>
        <input min='1' onChange={(e) => setSavings(e.target.value)} step='any' type='number' value={savings} />
      </div>
      {Number(savings) / Number(remainingDays.split(' ')[0])}
    </div>
  );
};
