const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/loginRouter');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/login', loginRouter);

app.use((error, req, res, _next) => {
  console.log(error);
  res.status(500).json({ message: 'internal server error' });
});

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
