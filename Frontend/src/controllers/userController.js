const userService = require('../services/userService');

let handleGetTopUser = async (req, res) => {
  try {
    let option = req.query.option;
    if (!option) {
      return res.status(404).json({
        errCode: 2,
        message: 'Lỗi truyền dữ liệu đầu vào',
      });
    }
    let result = await userService.getTopUser(option);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  handleGetTopUser: handleGetTopUser,
};
