const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  res.json('Navigate to /contacts, then /contacts/{_id}, and /contacts/search?id={_id}');
});

routes.use('/contacts', require('./contacts'));
routes.use('/', require('./swagger'))

module.exports = routes;