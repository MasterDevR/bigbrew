import React from "react";
import classes from "@/styles/admin_product.module.css";
import Product from "@/components/layout/admin/products/Product";
const index = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container}></div>
      <main>
        <Product />
      </main>
    </div>
  );
};

export default index;
