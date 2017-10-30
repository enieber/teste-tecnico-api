const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const server = require('../server');
const JWT_PASSWORD = require('../token');

const db = require('../../db');

const schema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});


const isValidLogin = (email, password) => {
 const result = Joi.validate({email, password }, schema);
 if (result.error) {
   console.log(result.error);
   return false;

 }
 return true;
}

server.post('/login', (req, res, next) => {
  if (req.body) {
    const email = req.body.email;
    const password = req.body.password;

    if (isValidLogin(email, password)) {
	 db.each("SELECT * FROM user", async (err, row) => {
	    if (err) return;
	    if (email == row.email) {
 		hash = row.PASSWORD;
		bcrypt.compare(password, hash, (err, isValid) => {
		   if (err) return err;
		   if (isValid) {
   	             const token = jwt.sign({email}, JWT_PASSWORD, { expiresIn: '1h'});
   		     console.log(res.send)
		     res.send({
	      		     error: false,
	      		     message: ` O usuario ${email} esta logado`,
	      		     token,
		     });
		   }
    	        });
	    }
          });
	 return next();
      }
    }

    res.send(400, {
   	error: true,
	mesage: 'os parametros usuario e senha precisam ser enviados!',
    });
    return next();

});

server.get('/session', (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(req.headers);
  if (!auth) {
    res.send(401, {error: 'Sessão invalida' });
    return next();
  }

  res.send({ success: true });
  return next();

});

