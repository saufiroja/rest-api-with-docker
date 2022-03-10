const { Sequelize } = require('sequelize');

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_SSL,
  POOL_MAX,
  POOL_MIN,
  POOL_ACQUIRE,
  POOL_IDLE,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: POOL_MAX,
    min: POOL_MIN,
    acquire: POOL_ACQUIRE,
    idle: POOL_IDLE,
  },
  dialectOptions: {
    ssl: DB_SSL === 'true',
  },
});

module.exports = sequelize;
