import dbConn from "../../database/conn.js";
import util from "util";

const getAllData = async (req, res) => {
  const con = dbConn(); // Get the database connection
  const query = "SELECT * FROM products";

  const connectPromise = util.promisify(con.connect).bind(con);
  const queryPromise = util.promisify(con.query).bind(con);
  const endPromise = util.promisify(con.end).bind(con);

  try {
    await connectPromise();

    const results = await queryPromise(query);

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await endPromise();
  }
};

export default getAllData;
