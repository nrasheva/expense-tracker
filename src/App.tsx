import { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Accounts, Categories, Expenses, Tabs } from './components/_index';

const TABS = ['accounts', 'categories', 'expenses'];

function App() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <Provider store={store}>
      <div className='app'>
        <h1>Overview</h1>
        <Tabs activeTab={activeTab} handleTabClick={(tab) => setActiveTab(tab)} tabs={TABS} />
        {activeTab === 'accounts' && <Accounts />}
        {activeTab === 'expenses' && <Expenses />}
        {activeTab === 'categories' && <Categories />}
      </div>
    </Provider>
  );
}

export default App;
