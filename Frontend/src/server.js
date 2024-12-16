require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 8080;
const connectDB = require('./config/connectDatabase');
const configViewEngine = require('./config/viewEngine');
const initWebRouters = require('./routes/web');
const initAPIs = require('./routes/api');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const paypal = require('./config/paypal.Config');
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware({
  target: 'https://www.sandbox.paypal.com',
  changeOrigin: true,
  pathRewrite: {
    '^/paypal': '',
  },
});

app.use(
  cors({
    origin: true,
  })
);

// app.use(cors({ origin: [process.env.URL_PAYPAL, process.env.URL_BACK_END] }));
// ---------------------------------

// Config req.body
// Middleware convert object req -> Json de su dung
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view
configViewEngine(app);

// Khai bao routes
initWebRouters(app);
initAPIs(app);

app.post('/pay', apiProxy, (req, res) => {
  try {
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:3124/success',
        cancel_url: 'http://localhost:3124/cancel',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'Iphone 4S',
                sku: '001',
                price: '25.00',
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: '25.00',
          },
          description: 'Iphone 4S cũ giá siêu rẻ',
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '25.00',
        },
      },
    ],
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send('Success (Mua hàng thành công)');
      }
    }
  );
});

app.get('/cancel', (req, res) => res.send('Cancelled (Đơn hàng đã hủy)'));

// Middleware 404 not found
app.use((req, res) => {
  return res.render('404.ejs');
});

connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Server running at http://localhost:${port}/`);
});
