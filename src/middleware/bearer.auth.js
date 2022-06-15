'use strict';
const User = require('../models/user.model');
function bearer(req, res, next) {
  if (req.headers.authorization) {
    const bearerToken = req.headers.authorization.split(' ')[1];
    User.bearerAuthentication(bearerToken)
      .then((userData) => {
        req.user = userData;
        next();
      })
      .catch(() => {
        next('Invalid Token');
      });
  }
}

module.exports = bearer;
