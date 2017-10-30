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


const isValidUser = (email, password) => {
 const result = Joi.validate({email, password }, schema);
 if (result.error) {
   console.log(result.error);
   return false;
 }
 return true;
}

server.post('/register', async (req, res, next) => {
  if (req.body) {
    const email = req.body.email;
    const passwordTextPlane = req.body.password;

    if (isValidUser(email, passwordTextPlane)) {
	 const token = jwt.sign({email}, JWT_PASSWORD, { expiresIn: '1h'});
	 let password = await bcrypt.hash(passwordTextPlane, 10);
	 console.log(password);

	 const statement = db.prepare('INSERT INTO `user` (`email`, `password`) ' +
			 'VALUES (?, ?)');
	 statement.run(email, password);
	 statement.finalize();

         res.send({
           error: false,
	   message: ` O usuario ${email} esta logado`,
	   token,
	 });
	 return next();
    }
  }
    res.send(400, {
   	error: true,
	mesage: 'os parametros email e senha precisam ser enviados!',
    });
    return next();
});

