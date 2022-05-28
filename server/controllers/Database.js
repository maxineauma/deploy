import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.DB_URL,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const QuerySimple = (query, vars) => {
  let q = connection.query(query, vars, (err) => {
    if (err) console.log(err);
  });
};

export const QueryCallback = (query, vars, callback) => {
  let q = connection.query(query, vars, (err, res) => {
    if (err) console.log(err);

    callback(res);
  });
};