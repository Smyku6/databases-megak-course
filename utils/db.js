const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'megak_todo',
  namedPlaceholders: true,
  decimalNumbers: true,
  bigNumberStrings: false
});

module.exports = {
  pool
}
