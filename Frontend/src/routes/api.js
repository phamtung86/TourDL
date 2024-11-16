const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');
const userController = require('../controllers/userController');

const initAPIs = (app) => {
  router.get('/transports', transportController.handleGetValues);
  router.post('/transports', transportController.handleCreate);
  //* Khách hàng tiềm năng, phương tiện ưa thích
  router.get('/users-top', userController.handleGetTopUser);
  return app.use('/api/v1/', router);
};

module.exports = initAPIs;
