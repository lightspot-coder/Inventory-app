const { Pool } = require("pg");
const { env } = require("node:process");

module.exports = new Pool({
  host: env.HOST,
  user: env.USER,
  database: env.DATABASE,
  password: env.PASSWORD,
  port: env.PORT,
});
