const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');
const userController = require('../controllers/userController');
const tourController = require('../controllers/tourController');
const paymentController = require('../controllers/paymentController');
const provinceController = require('../controllers/provinceController');
const authController = require('../controllers/authController');
const validateMiddleware = require('../middleware/validate');

const initAPIs = (app) => {
  router.get('/transports', transportController.handleGetValues);
  router.post('/transports', transportController.handleCreate);
  router.get(
    '/users-top',
    validateMiddleware.validateAPI,
    validateMiddleware.authorizationAPIAdmin,
    userController.handleGetTopUser
  );
  router.get(
    '/tours',
    validateMiddleware.validateAPI,
    validateMiddleware.authorizationAPIAdmin,
    tourController.handleGetTourType
  );
  router.get('/tours/:id', tourController.handleGetTourDetail);
  router.get(
    '/users/:id',
    validateMiddleware.validateAPI,
    validateMiddleware.authorizationAPI,
    userController.handleGetInfo
  );
  router.get('/provinces', provinceController.handleGetAll);
  // Post tour
  router.post(
    '/tour-order',
    validateMiddleware.validateAPI,
    validateMiddleware.authorizationAPI,
    tourController.handleOrderTour
  );
  router.post(
    '/payment',
    validateMiddleware.validateAPI,
    validateMiddleware.authorizationAPI,
    paymentController.handleCreateOrder
  );
  router.post('/auth/login', authController.handleLogin);
  router.post(
    '/auth/logout',
    validateMiddleware.validateAPI,
    validateMiddleware.authorizationAPI,
    (req, res) => {
      res.clearCookie('SessionID', { path: '/' });
      res.status(200).json({
        message: 'OK',
      });
    }
  );

  return app.use('/api/v1/', router);
};

module.exports = initAPIs;
