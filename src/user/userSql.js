const createTable = () => 'CREATE TABLE IF NOT EXISTS user(email TEXT NOT NULL, PASSWORD TEXT NOT NULL)';

module.exports = {
  createTable,
}
