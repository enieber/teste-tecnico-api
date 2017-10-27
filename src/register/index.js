const server = require('../server');

server.get('/register', (req, res, next) => {
  res.send({name: 'register'});
  return next();
});


