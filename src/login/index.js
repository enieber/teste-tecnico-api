const server = require('../server');

server.get('/login', (req, res, next) => {
  res.send('login');
  return next();
});

