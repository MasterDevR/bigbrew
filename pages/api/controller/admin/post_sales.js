import dbConn from "../../database/conn.js";

const post_sale = async (req, res) => {
  try {
    const data = JSON.parse(req.body.itemData);

    const con = dbConn();

    console.log(`Databest : ${data}`);
    const updateAndInsertPromises = data.map((item) => {
      return new Promise((resolve, reject) => {
        const { id, name, src, category, price, originalPrice, quantity } =
          item;

        const checkQuery =
          "SELECT id, quantity_sale, total_sale FROM sales WHERE id = ?";
        con.query(checkQuery, [id], (err, results) => {
          if (err) {
            reject(err);
            return;
          }

          if (results.length === 0) {
            // Item doesn't exist, insert it
            const saleDate = new Date().toISOString().slice(0, 10);
            const insertQuery =
              "INSERT INTO sales (id, product, category, photo, price, total_sale,quantity_sale, sale_date) VALUES (?, ?,?, ?, ?, ?, ?, ?)";
            con.query(
              insertQuery,
              [
                id,
                name,
                category,
                src,
                originalPrice,
                price,
                quantity,
                saleDate,
              ],
              (insertErr) => {
                if (insertErr) {
                  reject(insertErr);
                } else {
                  resolve();
                }
              }
            );
          } else {
            const existingItem = results[0];
            const newQuantitySale = existingItem.quantity_sale + quantity;
            const newTotalSale = existingItem.total_sale + price;
            const updateQuery =
              "UPDATE sales SET quantity_sale = ?, total_sale = ? WHERE id = ?";
            con.query(
              updateQuery,
              [newQuantitySale, newTotalSale, id],
              (updateErr) => {
                if (updateErr) {
                  reject(updateErr);
                } else {
                  resolve();
                }
              }
            );
          }
        });
      });
    });

    await Promise.all(updateAndInsertPromises);

    res.json({ message: "Data processed successfully" });
    con.end();
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Data processing failed" });
    con.end();
  }
};

export default post_sale;
