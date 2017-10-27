const server = require('../server');

server.get('/profile', (req, res, next) => {
  res.send('profile');
  return next();
});


