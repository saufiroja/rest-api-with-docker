require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// const authRouter = require('./routers/auth.routers');

// Desc: Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

// Desc: Routes
app.use('/api', require('./routers/auth.routers'));
app.use('/', (req, res) => {
  res.send('Hello World');
});

// Desc : Error handler
// Input : Error, Request, Response, Next
// Output : Error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: err,
  });
});

// Desc: Start server && connect to database
const sequelize = require('./database/models/sequelize');
const { PORT } = process.env || 3000;

(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
