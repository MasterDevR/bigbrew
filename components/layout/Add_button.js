import React, { useContext, useState } from "react";

import { storeHanlder } from "@/components/store/context";
import classes from "@/styles/add_button.module.css";

const Add_button = ({ title, item, id }) => {
  const ctx = useContext(storeHanlder);
  const [quantityCounter, setQuantityCounter] = useState(1);

  const addToCartHandler = () => {
    setQuantityCounter((prevData) => prevData + 1);
    const updatedItem = { ...item, quantity: quantityCounter };

    ctx.addToCartHandler(updatedItem);
  };

  return (
    <button onClick={addToCartHandler} className={classes.Add_button}>
      {title}
    </button>
  );
};

export default React.memo(Add_button);
