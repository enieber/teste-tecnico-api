const server = require('./src/server');
const login = require('./src/login');
const register = require('./src/register');
const profile = require('./src/profile');
const company = require('./src/company');
const dashboard = require('./src/dashboard');
const request = require('./src/request');

server.get('/', (req, res, next) => {
  res.send('home');
  return next();
});

