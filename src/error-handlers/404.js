'use strict';
module.exports = (req, res, next) => {
  res.status(404).send({
    messege: 'Page not found',
    code: 404,
    route: req.path,
  });
};
