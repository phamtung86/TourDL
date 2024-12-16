const crypto = require('crypto');
const axios = require('../utils/axios');
const { userInfo } = require('os');
require('dotenv').config();

let handleGetLinkPay = async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  //   let amount = req.query.amount;
  let amount = '50000';
  let accessKey = process.env.MOMO_ACCESS_KEY;
  let secretKey = process.env.MOMO_SECRET_KEY;
  let orderInfo = 'Đặt tour du lịch tại 3TV tour';
  let partnerCode = 'MOMO';
  let redirectUrl = process.env.MOMO_REDIRECT_URL;
  let ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  let requestType = 'payWithMethod';
  let orderId = partnerCode + new Date().getTime();
  let requestId = orderId;
  let extraData = '';
  let orderGroupId = '';
  let autoCapture = true;
  let lang = 'vi';

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  let rawSignature =
    'accessKey=' +
    accessKey +
    '&amount=' +
    amount +
    '&extraData=' +
    extraData +
    '&ipnUrl=' +
    ipnUrl +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&partnerCode=' +
    partnerCode +
    '&redirectUrl=' +
    redirectUrl +
    '&requestId=' +
    requestId +
    '&requestType=' +
    requestType;
  //puts raw signature
  console.log('--------------------RAW SIGNATURE----------------');
  console.log(rawSignature);
  //signature
  let signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
  console.log('--------------------SIGNATURE----------------');
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
    userInfo: {
      name: 'Nguyen Van A',
      phoneNumber: '0999888999',
      email: 'email_add@domain.com',
    },
  });
  // Tạo Option cho axios
  const option = {
    method: 'POST',
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };
  let result;
  try {
    result = await axios(option);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      statusCode: 500,
      message: 'Server error',
    });
  }
};

module.exports = {
  handleGetLinkPay: handleGetLinkPay,
};
