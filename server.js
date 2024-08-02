const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const user_id = "neeharika_meka";  
const email = "neeharika_meka@srmap.edu.in";         
const roll_number = "AP21110011417";        

app.post('/bfhl', (req, res) => {
  const data = req.body.data;

  if (!data) {
    return res.status(400).json({ is_success: false });
  }

  const numbers = [];
  const alphabets = [];

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()] : [];

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
