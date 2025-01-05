// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const entries = [];

app.post('/addExpense', (req, res) => {
  const { expenditure, price } = req.body;

  if (!expenditure || !price) {
    return res.status(400).json({ error: 'Expenditure and price are required.' });
  }

  const newEntry = {
    expenditure,
    price: parseFloat(price), // Ensure the price is a number
    timestamp: new Date().toLocaleString(),
  };

  entries.push(newEntry);
  res.status(201).json(newEntry);
});

app.get('/getEntries', (req, res) => {
  res.json(entries);
});

app.get('/getTotalWeekExpense', (req, res) => {
  const weekTotal = entries.reduce((total, entry) => total + entry.price, 0);
  res.json({ totalWeekExpense: weekTotal.toFixed(2) });
});

app.get('/', (req, res) => {
  res.send('Server is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
