require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 8080;
const configViewEngine = require('./config/viewEngine');
const initWebRouters = require('./routes/web');

const app = express();

// Config req.body
// Middleware convert object req -> Json de su dung
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// Config view
configViewEngine(app);

// Khai bao routes
initWebRouters(app);

// Middleware 404 not found
app.use((req, res) => {
  return res.render('404.ejs');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Server running at http://localhost:${port}/`);
});
