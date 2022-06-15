'use strict';
require('dotenv').config();
//require all models

// This to check which DB sequelize should connect to
const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');
//this is for Heroku to accept SSL only
let sequelizeOptions =
  process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
  sequelize,
  DataTypes,
};
