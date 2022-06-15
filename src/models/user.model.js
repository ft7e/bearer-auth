'use strict';
require('dotenv').config();

const { sequelize, DataTypes } = require('./index.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || 'any word';

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.VIRTUAL,
  },
});

User.basicAuthentication = async function (username, password) {
  const user = await User.findOne({ where: { username: username } });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    let newToken = jwt.sign({ username: user.username }, SECRET, {
      expiresIn: '5m',
    });
    user.token = newToken;
    return user;
  } else {
    throw new Error('Invalid Credentials');
  }
};
User.bearerAuthentication = async function (token) {
  const decoded = jwt.verify(token, SECRET);
  const user = await User.findOne({ where: { username: decoded.username } });
  if (user.username) {
    return user;
  } else {
    throw new Error('Invalid Token');
  }
};
module.exports = User;
