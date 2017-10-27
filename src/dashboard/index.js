const server = require('../server');

server.get('/dashboard', (req, res, next) => {
  res.send('dashboard');
  return next();
});

