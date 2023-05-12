var express = require('express');
var app = express();
// Middlewares
var cors = require('cors');
const bodyParser = require('body-parser');

const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// Setting up middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'Origin, X-Requested-With, content-Type, Accept, Z-Key'
    );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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