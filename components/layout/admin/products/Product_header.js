import React from "react";
import classes from "@/styles/productList.module.css";
import { FiEdit } from "react-icons/fi";

const Product_header = ({
  SelectedItem,
  addProductHandler,
  editHandler,
  handleChange,
}) => {
  return (
    <>
      <h1>Product List: </h1>
      <select onChange={handleChange}>{SelectedItem}</select>
      <button onClick={addProductHandler}>Add Product</button>
      <FiEdit onClick={editHandler} id={classes.editBTN} />
    </>
  );
};

export default Product_header;
