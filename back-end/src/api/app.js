const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/loginRouter');
const registerRouter = require('../routes/registerRouter');
const productRouter = require('../routes/productRouter');
const tokenRouter = require('../routes/tokenRouter');
const saleRouter = require('../routes/saleRouter');
const sellerRouter = require('../routes/sellerRouter');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productRouter);
app.use('/validateToken', tokenRouter);
app.use('/sale', saleRouter);
app.use('/sellers', sellerRouter);

app.use(express.static('public'));

app.use((error, req, res, _next) => {
  console.log(error);
  res.status(500).json({ message: 'internal server error' });
});

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
