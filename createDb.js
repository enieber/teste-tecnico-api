const db = require('./db');
const userSql = require('./src/user/userSql');

db.serialize(() => {
	db.run(userSql.createTable());;
});

