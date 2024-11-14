const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');

const initAPIs = (app) => {
  router.get('/transports', transportController.handleGetValues);
  router.post('/transports', transportController.handleCreate);
  return app.use('/api/v1/', router);
};

module.exports = initAPIs;
