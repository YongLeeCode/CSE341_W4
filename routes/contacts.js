const routes = require('express').Router();

const contactController = require('../controllers/contacts');

// Routes are here
routes.get('/', contactController.getContacts);

routes.get('/search', contactController.searchContact);

routes.get('/:id', contactController.getSingle);

routes.post('/create', contactController.addContact);

routes.put('/:id', contactController.updateContact);

routes.delete('/:id', contactController.deleteContact);

module.exports = routes;

