const express = require('express');
const router = express.Router();
const adminController = require('../controllers/dashboardController');
const { orderPage } = require('../controllers/customerController.js');
const axios = require('../utils/axios.js');
const paymentService = require('../services/paymentService.js');
const validateMiddleware = require('../middleware/validate');

const initWebRouters = (app) => {
  // Trang chủ
  router.get('/', (req, res) => {
    return res.render('customer/home.ejs');
  });
  // Dashboard
  router.get(
    '/Dashboard',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    adminController.getDashBoard
  );
  // Quản lí voucher
  router.get(
    '/voucher',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      return res.render('admin/voucher.ejs');
    }
  );
  router.get(
    '/voucher/add',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      return res.render('admin/voucherAdd.ejs');
    }
  );
  router.get(
    '/voucher/modify/:id',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      const voucherId = req.params.id;
      return res.render('admin/voucherModify.ejs', { voucherId });
    }
  );
  // Quản lí tour
  router.get(
    '/tour/add',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      return res.render('admin/tourAdd.ejs');
    }
  );
  router.get(
    '/tour/modify/:id',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      const tourId = req.params.id;
      return res.render('admin/tourModify.ejs', { tourId });
    }
  );
  router.get(
    '/tour',
    validateMiddleware.checkLogged,
    // validateMiddleware.authorizationAdmin,
    (req, res) => {
      return res.render('admin/tour.ejs');
    }
  );
  // Quản lí lịch tour
  router.get(
    '/calendar/add/:id',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      const tourId = req.params.id;
      return res.render('admin/calendarAdd.ejs', { tourId });
    }
  );
  router.get(
    '/calendar/modify/:id',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      const calendarId = req.params.id;
      return res.render('admin/calendarModify.ejs', { calendarId });
    }
  );
  router.get(
    '/tour/calendar/:id',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      const tourId = req.params.id;
      return res.render('admin/tourCalendar.ejs', { tourId });
    }
  );
  router.get(
    '/tour/detail/:id',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      const tourId = req.params.id;
      return res.render('admin/tourDetail.ejs', { tourId });
    }
  );
  // Quản lí tài khoản
  router.get(
    '/customer',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      return res.render('admin/customer.ejs');
    }
  );
  // Đặt tour
  router.get('/order-tour', validateMiddleware.checkLogged, orderPage);
  // trang chi tiết đặt tour
  router.get('/detail/:id', async (req, res) => {
    let response = await axios.get(
      `http://localhost:3124/api/v1/tours/${req.params.id}`
    );
    return res.render('customer/detail.ejs');
  });

  // Đăng nhập
  router.get('/login', (req, res) => {
    return res.render('customer/login.ejs');
  });

  // Đăng ký
  router.get('/register', (req, res) => {
    return res.render('customer/register.ejs');
  });

  // Thay đổi mật khẩu
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

  // Quản lí order
  router.get(
    '/admin-order',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      return res.render('admin/order.ejs');
    }
  );
  router.get(
    '/admin-order/user/:userId/order/:orderID',
    validateMiddleware.checkLogged,
    validateMiddleware.authorizationAdmin,
    (req, res) => {
      const userId = req.params.userId;
      const orderId = req.params.orderID;
      return res.render('admin/orderAdminDetail.ejs', { userId, orderId });
    }
  );

  // Đặt tour thành công
  router.get(
    '/complete-order',
    validateMiddleware.checkLogged,
    async (req, res) => {
      try {
        await paymentService.capturePayment(req.query.token);
        return res.render('customer/orderTourSuccess');
      } catch (error) {
        return res.redirect('/');
      }
    }
  );

  // Hủy thanh toán đặt tour
  router.get('/cancel-order', validateMiddleware.checkLogged, (req, res) => {
    // res.redirect('/');
    res.render('customer/orderTourSuccess');
  });

  return app.use('/', router);
};

module.exports = initWebRouters;
