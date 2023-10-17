import React, { useState } from "react";
import classes from "@/styles/Nav_bar.module.css";
const show_cart = () => {
  const [totalItems, setTotalItems] = useState(0);

  return (
    <>
      <button>
        <div className={`${classes.imgLink} ${classes.cart}`}>
          <div className={classes.cartBTN}>
            <span>{totalItems}</span>
            <AiOutlineShoppingCart size={"3rem"} />
          </div>
          View Cart
        </div>
      </button>
    </>
  );
};

export default show_cart;
