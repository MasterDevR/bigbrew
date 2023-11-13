import dbConn from "../../database/conn.js";

const getSales = async (req, res) => {
  const con = dbConn();
  const query = "SELECT * FROM sales";

  con.connect(function (err) {
    if (err) {
      console.error("Database connection error:", err);
      return res
        .status(500)
        .send({ status: 500, error: "Database connection error" });
    }

    con.query(query, function (err, result, fields) {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .send({ status: 500, error: "Database query error" });
      }

      con.end();
      return res.send({ status: 200, result });
    });
  });
};

export default getSales;
