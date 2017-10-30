const restify = require('restify');

const server = restify.createServer();

const JWT_SECRET = require('./token');
const jwtAuth = require('restify-jwt-auth-next');

let handler = function (req, res, next) {
	return res.redirect('/login')
}

let options = {
	  secret: JWT_SECRET,
	  blacklist: ['/profile'], // blacklist routes like '/noaccess', will always return handler 
	  whitelist: ['/login', '/'], // whitelist routes like '/immediate', no auth needed 
	  handler // default is redirect as above. Will send a 302 and the login route 
}

//server.use(jwtAuth(options))
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.bodyParser());

module.exports = server;
