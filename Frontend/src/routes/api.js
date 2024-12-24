const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');
const userController = require('../controllers/userController');
const tourController = require('../controllers/tourController');
const paymentController = require('../controllers/paymentController');
const provinceController = require('../controllers/provinceController');
const validateMiddleware = require('../middleware/validate');

const initAPIs = (app) => {
  router.get('/transports', transportController.handleGetValues);
  router.post('/transports', transportController.handleCreate);
  router.get('/users-top', userController.handleGetTopUser);
  router.get('/tours', tourController.handleGetTourType);
  router.get('/tours/:id', tourController.handleGetTourDetail);
  router.get(
    '/users/:id',
    validateMiddleware.validateAPI,
    userController.handleGetInfo
  );
  router.get('/provinces', provinceController.handleGetAll);
  // Post tour
  router.post('/tour-order', tourController.handleOrderTour);
  router.post('/payment', paymentController.handleCreateOrder);
  return app.use('/api/v1/', router);
};

module.exports = initAPIs;
