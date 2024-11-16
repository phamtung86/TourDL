const express = require('express');
const router = express.Router();
const db = require('../models/index');
const adminController = require('../controllers/dashboardController');
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
  // router.get('/Dashboard', async (req, res) => {
  //   return res.render("admin/index.ejs", {})
  // })
  router.get('/Dashboard', adminController.getDashBoard);
  router.get('/voucher', (req, res) => {
    return res.send('This is voucher page');
  });
  return app.use('/', router);
};

module.exports = initWebRouters;
