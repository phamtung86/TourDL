const tourService = require('../services/tourService');

let handleGetTourType = async (req, res) => {
  try {
    let option = req.query.option;
    if (!option) {
      return res.status(400).json({
        errCode: 2,
        message: 'Lỗi truyền dữ liệu đầu vào',
      });
    }
    if (option !== 'typeTour' && option !== 'customer') {
      return res.status(404).json({
        errCode: 1,
        message: 'Đầu vào dữ liệu không hợp lệ',
      });
    }
    let result = {};
    if (option === 'typeTour') {
      result = await tourService.getTourByType();
    }
    if (option === 'customer') {
      result = await tourService.getTourByCustomer();
    }
    return res.status(200).json({
      errCoder: result.status,
      data: result.data,
      message: 'OK',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      message: 'Lỗi call api',
    });
  }
};

module.exports = {
  handleGetTourType: handleGetTourType,
};
