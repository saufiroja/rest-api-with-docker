require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

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
const authRouter = require('./routers/auth.routers');
const postRouter = require('./routers/post.routers');

app.use('/api', authRouter);
app.use('/api', postRouter);

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
const sequelize = require('./utils/sequelize');
const { PORT } = process.env || 3000;

(async () => {
  try {
    await sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
