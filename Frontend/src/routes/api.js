const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');
const userController = require('../controllers/userController');
const tourController = require('../controllers/tourController');

const initAPIs = (app) => {
  router.get('/transports', transportController.handleGetValues);
  router.post('/transports', transportController.handleCreate);
  router.get('/users-top', userController.handleGetTopUser);
  router.get('/tours', tourController.handleGetTourType);
  router.get('/tours/:id', tourController.handleGetTourDetail);
  return app.use('/api/v1/', router);
};

module.exports = initAPIs;
