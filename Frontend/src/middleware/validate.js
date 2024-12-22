const jwt = require('jsonwebtoken');

let validateAPI = (req, res, next) => {
  try {
  } catch (error) {
    return;
  }
};
// Middleware check logged in
let checkLogged = async (req, res, next) => {
  try {
    let authHeader = req.cookies['SessionID'];
    let userId = req.signedCookies['UserID'];
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
  } catch (error) {
    return res.status(500).json({
      message: 'error from server',
    });
  }
};
