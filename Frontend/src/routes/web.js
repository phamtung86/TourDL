const express = require('express');
const router = express.Router();
const db = require('../models');

const initWebRouters = (app) => {
  router.get('/', (req, res) => {
    return res.send('GetDone');
  });
  router.get('/get-test', async (req, res) => {
    let tour_order = await db.TourOder.findAll({});
    return res.send(tour_order.JSON());
  });
  return app.use('/', router);
};

module.exports = initWebRouters;
