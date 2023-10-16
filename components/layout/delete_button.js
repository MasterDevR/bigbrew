import React from "react";
import { useContext } from "react";
import { storeHanlder } from "../store/context";
const delete_button = ({ id }) => {
  const ctx = useContext(storeHanlder);

  const delBntHandler = () => {
    ctx.removeItemHandler(id);
  };

  return (
    <>
      <button onClick={delBntHandler}>-</button>
    </>
  );
};

export default React.memo(delete_button);
