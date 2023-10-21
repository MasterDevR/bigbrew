import { storeHanlder } from "@/components/store/context";
import { useState, useEffect, useContext } from "react";
import classes from "@/styles/cart.module.css";

import Add_quantity_Button from "@/components/layout/add_quantity_Button";
import Delete_button from "@/components/layout/delete_button";
import Check_out from "@/components/layout/check_out";

const index = () => {
  const ctx = useContext(storeHanlder);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setItems(ctx.cartItems);
  }, [ctx.cartItems]);
  useEffect(() => {
    setTotalPrice(ctx.total_price);
  }, [ctx.total_price]);
  const mappedItem = items?.map((item) => {
    return (
      <div key={item.id} className={classes.card}>
        <span>{item.name}</span>
        <img src={`/images/${item.src}`} alt={item.name} id={classes.imgId} />
        <span>Quantity: {item.quantity}</span>
        <span>Price: {item.price}</span>
        <div className={classes.btnContainer}>
          <Add_quantity_Button id={item.id} />
          <Delete_button id={item.id} />
        </div>
      </div>
    );
  });
  return (
    <div className={classes.container}>
      {mappedItem}
      <div className={classes.checkOut}>
        <span id={classes.total_Price}>total Price : {totalPrice}</span>
        <Check_out />
      </div>
    </div>
  );
};

export default index;
