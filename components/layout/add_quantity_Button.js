import React, { useContext } from "react";
import { storeHanlder } from "../store/context";
const add_quantity_Button = ({ id }) => {
  const ctx = useContext(storeHanlder);
  const add_quantity_Button = () => {
    ctx.addItemHandler(id);
  };
  return <button onClick={add_quantity_Button}>+</button>;
};

export default React.memo(add_quantity_Button);
