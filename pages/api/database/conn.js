const mysql = require("mysql");

const dbConn = () => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bigbrew",
  });

  return con;
};

export default dbConn;
