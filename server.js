const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(express.json());

// POST method for /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  // Validation
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid data format' });
  }

  // Process data
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestAlphabet = alphabets.length
    ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()]
    : [];

  const response = {
    is_success: true,
    user_id: "neeharika_meka", 
    email: "neeharika_meka@srmap.edu.in", 
    roll_number: "AP21110011417", 
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet
  };

  res.status(200).json(response);
});

// GET method for /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const corsOptions = {
  origin: 'https://bfhl-frontend-s4rq.onrender.com',
};

app.use(cors(corsOptions));
