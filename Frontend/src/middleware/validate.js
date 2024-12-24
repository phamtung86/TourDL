require('dotenv').config();
const jwt = require('jsonwebtoken');

let validateAPI = (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization.split(' ');
    let token = bearerToken[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({
        errCode: 2,
        message: 'Không token xác thực',
      });
    }
    try {
      //   let generationToken = jwt.sign(
      //     {
      //       name: 'vinh',
      //     },
      //     'khanhvinh',
      //     {
      //       algorithm: 'HS256',
      //     }
      //   );
      //   let tokenVerify = jwt.verify(generationToken, 'khanhvinh');
      let tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
      console.log(tokenVerify);
    } catch (error) {
      console.log(error);

      return res.status(401).json({
        errCode: 2,
        message: 'Token không hợp lệ',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      message: 'Error from server',
    });
  }
};
// Middleware check logged in
let checkLogged = async (req, res, next) => {
  try {
    let authHeader = req.headers;
    // console.log({ req });
    next();
    /*
    if (!authHeader || !userId) {
      return res.redirect('/login');
    }
    try {
      let result = await authService.getPublicKey(userId);
      if (result.errCode !== 0) {
        return res.redirect('/login');
      }
      let verify = jwt.verify(authHeader, result.publicKey);
      return next();
    } catch (error) {
      return res.redirect('/login');
    }
    */
  } catch (error) {
    return res.status(500).json({
      message: 'error from server',
    });
  }
};

module.exports = {
  checkLogged: checkLogged,
  validateAPI: validateAPI,
};
