'use strict';
module.exports = (req, res, next) => {
  console.log('Request info : ', req.method, req.path);
  next();
};
