const server = require('../server');

server.get('/company', (req, res, next) => {
  res.send('company');
  return next();
});
