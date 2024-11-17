const userService = require('../services/userService');

let handleGetTopUser = async (req, res) => {
  try {
    let option = parseInt(req.query.month);
    console.log(`option ${option} || ${typeof option}`);

    if (!option) {
      return res.status(404).json({
        errCode: 2,
        message: 'Lỗi truyền dữ liệu đầu vào',
      });
    }
    if (option !== 3 && option !== 6) {
      return res.status(400).json({
        errCode: 1,
        message: 'Đầu vào dữ liệu không hợp lệ',
      });
    }
    let result = await userService.getTopUser(option);
    return res.status(200).json({
      errCode: result.status,
      data: result.data,
      message: 'OK',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: 3,
      message: 'Lỗi call api',
    });
  }
};

module.exports = {
  handleGetTopUser: handleGetTopUser,
};
