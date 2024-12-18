const axios = require('axios');

async function generateAccessToken() {
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
    method: 'post',
    data: 'grant_type=client_credentials',
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
  });

  return response.data.access_token;
}

let createOrder = async (data) => {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    data: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          items: [
            {
              name: data.name,
              description: data.description,
              quantity: 1,
              unit_amount: {
                currency_code: 'USD',
                value: data.price,
              },
            },
          ],

          amount: {
            currency_code: 'USD',
            value: data.price,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: data.price,
              },
            },
          },
        },
      ],

      application_context: {
        return_url: process.env.URL + '/complete-order',
        cancel_url: process.env.URL + '/cancel-order',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'manfra.io',
      },
    }),
  });

  return response.data.links.find((link) => link.rel === 'approve').href;
};

let capturePayment = async (orderId) => {
  const accessToken = await generateAccessToken();

  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  });

  return response.data;
};

module.exports = {
  createOrder: createOrder,
  capturePayment: capturePayment,
};
