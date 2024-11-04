const express = require('express');
const router = express.Router();

const initWebRouters = (app) => {
  router.get('/', (req, res) => {
    return res.send('GetDone');
  });
  return app.use('/', router);
};

module.exports = initWebRouters;
