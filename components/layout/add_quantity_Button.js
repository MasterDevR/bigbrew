import React from "react";

const add_quantity_Button = ({ id }) => {
  const add_quantity_Button = () => {
    console.log(id);
  };
  return <button onClick={add_quantity_Button}>+</button>;
};

export default React.memo(add_quantity_Button);
