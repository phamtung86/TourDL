const express = require('express');
const router = express.Router();
const db = require('../models/index');
const adminController = require('../controllers/dashboardController');
const { orderPage } = require('../controllers/customerController.js');
const axios = require('../utils/axios.js');
const paymentService = require('../services/paymentService.js');
const tourController = require('../controllers/tourController.js');
const initWebRouters = (app) => {
  router.get('/', (req, res) => {
    return res.render('customer/home.ejs');
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
    return res.render('admin/tourCalendar.ejs', { tourId });
  });
  router.get('/tour', (req, res) => {
    return res.render('admin/tour.ejs');
  });
  router.get('/order-tour', orderPage);

  // trang chi tiết đặt tour
  router.get('/detail/:id', async (req, res) => {
    let response = await axios.get(
      `http://localhost:3124/api/v1/tours/${req.params.id}`
    );
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
    return res.render('admin/orderAdminDetail.ejs', { userId, orderId });
  });

  // trang thay doi mat khau
  router.get('/change-password', async (req, res) => {
    const token = req.query.token;
    if (!token) {
      return res.status(400).send('Token is missing!');
    }

    try {
      // Gửi yêu cầu kiểm tra token
      const response = await axios.get(
        `http://localhost:8080/api/User/changePassword?token=${token}`
      );
      // Kiểm tra thông báo từ API
      if (response.message.trim().length > 0) {
        // Token hợp lệ, render trang thay đổi mật khẩu
        return res.render('customer/change-password.ejs', { token });
      } else {
        // Token không hợp lệ, hiển thị lỗi
        return res.status(403).send('Token không hợp lệ!');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      return res
        .status(500)
        .send('Đã xảy ra lỗi trong quá trình xác thực token');
    }
  });

  // Đặt tour thành công
  router.get('/complete-order', async (req, res, next) => {
    try {
      await paymentService.capturePayment(req.query.token);
      res.render('customer/orderTourSuccess');
    } catch (error) {
      res.send('Error: ' + error);
      res.render('/');
    }
  });

  // Hủy thanh toán đặt tour
  router.get('/cancel-order', (req, res) => {
    // res.redirect('/');
    res.render('customer/orderTourSuccess');
  });

  return app.use('/', router);
};

module.exports = initWebRouters;
