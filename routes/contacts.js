const routes = require('express').Router();
const contactController = require('../controllers/contacts');
const validation = require('../validator');

// Routes are here
routes.get('/', contactController.getContacts);

routes.get('/search', contactController.searchContact);

routes.get('/:id', contactController.getSingle);

routes.post('/', validation.saveContact, contactController.addContact);

routes.put('/:id', contactController.updateContact);

routes.delete('/:id', contactController.deleteContact);

module.exports = routes;

