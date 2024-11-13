require('dotenv').config();
const { Sequelize } = require('sequelize');
// Create connect to Database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);
// Test connect to Database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connect Database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = connectDB;
