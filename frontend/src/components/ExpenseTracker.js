// src/components/ExpenseTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const [expenditure, setExpenditure] = useState('');
  const [price, setPrice] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalWeekExpense, setTotalWeekExpense] = useState(0);

  useEffect(() => {
    fetchEntries();
    fetchTotalWeekExpense();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getEntries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const fetchTotalWeekExpense = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getTotalWeekExpense');
      setTotalWeekExpense(response.data.totalWeekExpense);
    } catch (error) {
      console.error('Error fetching total week expense:', error);
    }
  };

  const handleAddExpense = async () => {
    if (expenditure && price) {
      try {
        const response = await axios.post('http://localhost:3001/addExpense', {
          expenditure,
          price,
        });

        setEntries([...entries, response.data]);
        setExpenditure('');
        setPrice('');
        fetchTotalWeekExpense();
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div>
        <label htmlFor="expenditure">Expenditure:</label>
        <input
          type="text"
          id="expenditure"
          value={expenditure}
          onChange={(e) => setExpenditure(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price">Price (in rupees):</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button onClick={handleAddExpense}>Add Expense</button>

      <div>
        <h2>Expense Entries:</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.expenditure} - ₹{entry.price.toLocaleString()} ({entry.timestamp})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Total Weekly Expense:</h2>
        <p>₹{totalWeekExpense.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ExpenseTracker;
