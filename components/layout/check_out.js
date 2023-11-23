import React, { useContext, useEffect, useState } from "react";
import { storeHanlder } from "../store/context";
import classes from "@/styles/checkOut.module.css";
import axios from "axios";

const check_out = () => {
  const [data, setData] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState(""); // State to hold the checkout message

  const ctx = useContext(storeHanlder);

  useEffect(() => {
    setData(ctx.cartItems);
  }, [ctx.cartItems]);

  const verify_email_url = `http://localhost:3001/verifyEmail`;

  const checkOutHandler = async () => {
    if (data.length === 0) {
      alert("Cart is empty. Please add items before checking out.");
    } else {
      const email = prompt("Enter Email address for order Verification.");

      const emailRegex = /@gmail\.com$/i;

      if (emailRegex.test(email)) {
        try {
          const res = await axios.post(verify_email_url, { email });
          if (res.status === 200) {
            setCheckoutMessage("Verify your order via email.");
            localStorage.setItem("ItemData", JSON.stringify(data));
            // Additional actions if verification is successful can be added here.
          } else {
            setCheckoutMessage("Email verification failed. Please try again.");
            // Handle the case when verification is not successful.
          }
        } catch (err) {
          console.error("Error during verification:", err);
          setCheckoutMessage("An error occurred during email verification.");
        }
      } else {
        setCheckoutMessage(
          "Invalid email address. Please enter a valid Gmail address."
        );
      }
    }
  };

  const Alert = checkoutMessage && alert(checkoutMessage);

  return (
    <div>
      {Alert}
      <button onClick={checkOutHandler} className={classes.checkOut}>
        Check Out
      </button>
    </div>
  );
};

export default React.memo(check_out);
