const Pool = require('pg').Pool;
const user = process.env.USER;
const password = process.env.PASSWORD;

const pool = new Pool({
  user,
  password,
  host: 'localhost',
  port: '5432',
  database: 'todoapp'
});

module.exports = pool;