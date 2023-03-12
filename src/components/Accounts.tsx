import { useState } from 'react';

const TYPES = ['cash', 'checking', 'investments', 'savings'];

export const Accounts = () => {
  const [account, setAccount] = useState({
    balance: 0,
    name: '',
    type: '',
  });

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
      <h3>Accounts</h3>
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
    </div>
  );
};
