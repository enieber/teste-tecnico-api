const restify = require('restify');
const jwt = require('jsonwebtoken');
const createDb = require('./createDb');

const server = require('./src/server');
const routers = require('./routes');

server.listen(
   3000,
   () => console.log('%s listening at %s',
   server.name, server.url)
 );
