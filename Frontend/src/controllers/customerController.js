const axios = require('../utils/axios.js');

let orderPage = async (req, res) => {
  let tourId = req.query.tourId;
  let date = req.query.dateId;
  if (!tourId || !date) {
    return res.render('404.ejs');
  }
  return res.render('customer/orderTour.ejs');
};
module.exports = { orderPage: orderPage };
