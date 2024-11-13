const express = require('express');
const router = express.Router();
const db = require('../models');

const initWebRouters = (app) => {
  router.get('/', (req, res) => {
    return res.send('GetDone');
  });
  router.get('/adb', (req, res) => {
    return res.send('KhanhVinh');
  });
  router.get('/get-test', async (req, res) => {
    try {
      let tour_order = await db.TourDetail.findAll({});
      return res.status(200).json(tour_order);
    } catch (error) {
      return res.send(error);
    }
  });
  return app.use('/', router);
};

module.exports = initWebRouters;
