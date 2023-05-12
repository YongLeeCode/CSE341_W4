var express = require('express');
var app = express();
// Middlewares
var cors = require('cors');
const bodyParser = require('body-parser');

const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;

// Setting up middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/`, require(`./routes`));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
});