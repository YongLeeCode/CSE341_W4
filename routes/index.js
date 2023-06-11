const routes = require('express').Router();

const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:2000',
  clientID: '43jAooBvCeVtVWU0hwbc2WNE2723bCBh',
  issuerBaseURL: 'https://dev-uzdysvnagnwehokk.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
routes.use(auth(config));

// req.isAuthenticated is provided from the auth router
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const userController = require('../controllers/user')
routes.get('/profile', requiresAuth(), userController.addUser);

// routes.get('/profile', requiresAuth(),(req, res) => {
//   res.send(JSON.stringify(req.oidc.user));

//   const userController = require('../controllers/user');
//   console.log(req.oidc.user);
//   routes.post('/', userController.addUser);
// });


routes.get('/', (req, res, next) => {
  res.json('Navigate to /contacts, then /contacts/{_id}, and /contacts/search?id={_id}');
});


routes.use('/contacts',  (req, res, next) => {
  req.oidc.isAuthenticated() ? next() : res.status(401).json({"message" : "Authentication Error"})
} ,
require('./contacts'));


module.exports = routes;