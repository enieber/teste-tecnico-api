const server = require('../server');

server.get('/request', (req, res, next) => {
  res.send('request');
  return next();
});

