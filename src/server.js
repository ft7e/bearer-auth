'use strict';
// Essentials
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;

// Local requires
const logger = require('./middleware/logger');
const userRouter = require('./routes/user.route');
const notFoundErrorHandler = require('./error-handlers/404');
const internalErrorHandler = require('./error-handlers/500');

//Routes
app.use(express.json());
app.use(logger);
app.use(userRouter);
app.use('*', notFoundErrorHandler);
app.use(internalErrorHandler);

// start function
function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}
// export
module.exports = {
  app: app,
  start: start,
};
