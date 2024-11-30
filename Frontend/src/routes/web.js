const express = require('express');
const router = express.Router();
const db = require('../models/index');
const adminController = require('../controllers/dashboardController');
const initWebRouters = (app) => {
  router.get('/', (req, res) => {
    return res.render('customer/home.ejs');
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
  router.get('/Dashboard', adminController.getDashBoard);

  router.get('/transport', (req, res) => {
    return res.render('admin/transport.ejs');
  });

  router.get('/voucher', (req, res) => {
    return res.render('admin/voucher.ejs');
  });

  router.get('/voucher/add', (req, res) => {
    return res.render('admin/voucherAdd.ejs');
  });

  router.get('/voucher/modify/:id', (req, res) => {
    const voucherId = req.params.id;
    return res.render('admin/voucherModify.ejs', { voucherId });
  });

  // trang quản lý tài khoản người dùng
  router.get('/customer', (req, res) => {
    return res.render('admin/customer.ejs');
  });

  // Route để sửa thông tin người dùng
  router.get('/user/edit/:id', (req, res) => {
    const userId = req.params.id;
    return res.render('admin/customerModify.ejs', { userId })
  });

  // trang chi tiết đặt tour
  router.get('/detail', (req, res) => {
    return res.render('customer/detail.ejs');
  });

  // trang đăng nhập 
  router.get('/login', (req, res) => {
    return res.render('customer/login.ejs');
  });

  // // trang đăng ký
  // router.get('/register', (req, res) => {
  //   return res.render('customer/register.ejs');
  // });

  return app.use('/', router);
};

module.exports = initWebRouters;
