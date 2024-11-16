const axios = require('../utils/axios.js');
let getDashBoard = async (req, res) => {
  const revenue = await axios.get(`http://localhost:8080/api/v1/Revenue/MONTH`);
  const topTour = await axios.get(
    `http://localhost:8080/api/v1/TopTour?type=MONTH`
  );
  const totalAccountCustomer = await axios.get(
    `http://localhost:8080/api/User/TotalUsers`
  );
  const totalTourOrder = await axios.get(
    `http://localhost:8080/api/v1/TourOrders/TourOrdersByType/MONTH`
  );
  let data = {
    revenue: revenue,
    topTour: topTour,
    totalAccountCustomer: totalAccountCustomer,
    totalTourOrder: totalTourOrder,
  };
  return res.render('admin/dashboard.ejs', { data: data });
};
module.exports = { getDashBoard: getDashBoard };
