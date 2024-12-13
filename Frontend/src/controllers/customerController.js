const axios = require('../utils/axios.js');

let orderPage = async (req, res) => {
  let tourId = req.query.tourId;
  let date = req.query.dateId;
  if (!tourId || !date) {
    return res.render('404.ejs');
  }
  let dataTour;
  try {
    dataTour = await axios.get(
      `http://localhost:3124/api/v1/tours/${tourId}?dateId=${date}`
    );
  } catch (error) {
    console.log(error);
  }
  return res.render('customer/orderTour.ejs', {
    tour: dataTour.data,
    calendars: dataTour.data.tourCalendars[0],
  });
};
module.exports = { orderPage: orderPage };
