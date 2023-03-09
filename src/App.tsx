import { useState } from 'react';
import './App.css';
import { add, isBefore, startOfDay } from 'date-fns';

function App() {
  const [selectedDate, setSelectedDate] = useState(1);
  const [checked, setChecked] = useState(false);
  const [nextIncome, setNextIncome] = useState('');

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
  };

  return (
    <div className='app'>
      <div>
        <p>What day do you get paid?</p>
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
      {nextIncome}
    </div>
  );
}

export default App;
