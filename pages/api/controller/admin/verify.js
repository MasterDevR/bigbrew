const orders = {};
const verify = (req, res) => {
  const token = req.query.token;

  if (token) {
    orders[token] = "verified";
    res.status(200).json({ message: "Verification Successful" });
  } else if (orders[token] === "verified") {
    // The order is already verified
    res.status(200).json({ message: "Order already verified" });
  } else {
    // Invalid token or order not found
    res.status(401).json({ message: "Verification Unauthorized" });
  }
};
export default verify;
