var express = require('express');
var app = express();
// Middlewares
var cors = require('cors');
const bodyParser = require('body-parser');
//mongodb
const mongodb = require('./db/connect');
const port = process.env.PORT || 2000;
//api
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');


// Setting up middlewares
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDoc));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(`/`, require(`./routes`));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
});


// // auth0
// const { auth, requiresAuth } = require('express-openid-connect');
// const logger = require('morgan');
// const path = require('path');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());

// const config = {
//   authRequired: false,
//   auth0Logout: true
// };

// if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
//   config.baseURL = `http://localhost:${port}`;
// }

// app.use(auth(config));

// // Middleware to make the `user` object available for all views
// app.use(function (req, res, next) {
//   res.locals.user = req.oidc.user;
//   next();
// });

// // Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // Error handlers
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: process.env.NODE_ENV !== 'production' ? err : {}
//   });
// });


// //auth end