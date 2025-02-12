import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart
import PieChart from './components/PieChart';
import './styles/App.css';

const App = () => {
  const [month, setMonth] = useState(3); // Default month is March

  return (
    <div className="app">
      <h1>Roxiler Transactions Dashboard</h1>
      <div className="month-dropdown">
        <label>Select Month: </label>
        <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
};

export default App;
