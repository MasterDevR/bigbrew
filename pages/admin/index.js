import React from "react";
import Products_details from "@/components/layout/admin/products/products_details";
import classes from "@/styles/admin.module.css";
import Card from "@/components/layout/admin/dashboard/Card";
import Aside from "@/components/layout/admin/dashboard/Aside";
import Chart from "@/components/layout/admin/dashboard/Chart";
const index = () => {
  return (
    <div className={classes.container}>
      <header>
        <Card />
        <Card />
      </header>
      <main>
        <Products_details />
      </main>
      <aside>
        <Chart />
      </aside>
    </div>
  );
};

export default React.memo(index);
