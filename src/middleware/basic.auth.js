'use strict';
const base64 = require('base-64');
const User = require('../models/user.model');
module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    let basicHeaderPart = req.headers.authorization.split(' ');
    let encoded = basicHeaderPart[1];
    let decoded = base64.decode(encoded);
    let [username, password] = decoded.split(':');
    User.basicAuthentication(username, password)
      .then((validUser) => {
        req.user = validUser;
        next();
      })
      .catch((err) => next('Invalid User'));
  }
};
