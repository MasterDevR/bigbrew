import ProductsDetails from "@/components/layout/admin/products/products_details";
import React from "react";
import classes from "@/styles/admin_product.module.css";
const index = () => {
  return (
    <div className={classes.container}>
      <main>
        <ProductsDetails />
      </main>
    </div>
  );
};

export default index;
