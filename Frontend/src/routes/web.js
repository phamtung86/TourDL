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

  // trang quản lí phương tiện
  router.get('/transport', (req, res) => {
    return res.render('admin/transport.ejs');
  });

  router.get('/voucher', (req, res) => {
    return res.render('admin/voucher.ejs');
  });

  router.get('/voucher/add', (req, res) => {
    return res.render('admin/voucherAdd.ejs');
  });
  router.get('/tour/add', (req, res) => {
    return res.render('admin/tourAdd.ejs');
  });
  router.get('/tour/modify/:id', (req, res) => {
    const tourId = req.params.id;
    return res.render('admin/tourModify.ejs', { tourId });
  });
  router.get('/voucher/modify/:id', (req, res) => {
    const voucherId = req.params.id;
    return res.render('admin/voucherModify.ejs', { voucherId });
  });
  router.get('/calendar/add', (req, res) => {
    return res.render('admin/calendarAdd.ejs');
  });
  router.get('/calendar/modify/:id', (req, res) => {
    const calendarId = req.params.id;
    return res.render('admin/calendarModify.ejs', { calendarId });
  });
  
  // trang quản lý tài khoản
  router.get('/customer', (req, res) => {
    return res.render('admin/customer.ejs');
  });
  router.get('/tour/calendar/:id', (req, res) => {
    const tourId = req.params.id;
    return res.render('admin/tourCalendar.ejs',{tourId});
  });
  


  // trang cập nhật tài khoản người dùng
  router.get('/customerModify/:id', (req, res) => {
    const customerId = req.params.id;
    return res.render('admin/customerModify.ejs', { customerId });
  });
  router.get('/tour', (req, res) => {
    return res.render('admin/tour.ejs');
  });
  router.get('/order-tour', (req, res) => {
    return res.render('customer/orderTour.ejs');
  });

  // trang chi tiết đặt tour
  router.get('/detail', (req, res) => {
    return res.render('customer/detail.ejs');
  });

  // trang đăng nhập 
  router.get('/login', (req, res) => {
    return res.render('customer/login.ejs');
  });

  // trang đăng ký
  router.get('/register', (req, res) => {
    return res.render('customer/register.ejs');
  });

  // trang order
  router.get('/admin-order', (req, res) => {
    return res.render('admin/order.ejs');
  });

  router.get('/admin-order/user/:userId/order/:orderID', (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderID;
    return res.render('admin/orderAdminDetail.ejs', {userId,orderId});
  });

  return app.use('/', router);
};

module.exports = initWebRouters;
