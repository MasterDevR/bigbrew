import React from "react";
import Products_details from "@/components/layout/admin/products/products_details";
import classes from "@/styles/admin.module.css";
const index = () => {
  return (
    <div className={classes.container}>
      <header></header>
      <main>
        <Products_details />
      </main>
      <footer></footer>
    </div>
  );
};

export default index;
