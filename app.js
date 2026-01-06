const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// ? Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// ? Optional API route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
