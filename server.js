var express = require('express');
var app = express();
// Middlewares
var cors = require('cors');
const bodyParser = require('body-parser');
//mongodb
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
//api
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
//validation


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