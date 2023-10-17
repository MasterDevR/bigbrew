import { storeHanlder } from "@/components/store/context";
import { useState, useEffect, useContext } from "react";
import classes from "@/styles/cart.module.css";

import Add_quantity_Button from "@/components/layout/add_quantity_Button";
import Delete_button from "@/components/layout/delete_button";
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
        <span>{item.quantity}</span>
        <span>{item.price}</span>
        <img src={item.src} alt={item.name} />
        <Delete_button id={item.id} />
        <Add_quantity_Button id={item.id} />
      </div>
    );
  });
  return (
    <div className={classes.container}>
      {mappedItem}
      <span>total Price : {totalPrice}</span>
    </div>
  );
};

export default index;
