const { Sequelize } = require('sequelize');

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_SSL } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: DB_SSL === 'true',
  },
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
});

module.exports = sequelize;
