import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import classes from "@/styles/home.module.css";

import Add_button from "@/components/layout/Add_button";
import Delete_button from "@/components/layout/delete_button";
import Add_quantity_Button from "@/components/layout/add_quantity_Button";
const Home = () => {
  const [data, getData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/controller/admin/getData")
      .then((res) => {
        getData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Group items by category
  const groupedData = data?.reduce((result, item) => {
    if (!result[item.category]) {
      result[item.category] = [];
    }
    result[item.category].push(item);
    return result;
  }, {});

  // Render the grouped data
  const renderedData = Object.entries(groupedData).map(([category, items]) => (
    <div key={category} className={classes.produtcs_cart}>
      <h1>{category}</h1>
      {items.map((item) => (
        <div key={item.id} className={classes.product_details}>
          <Image
            src={`/images/${item.photo}`}
            width={300}
            height={300}
            alt={item.name}
            priority
          />
          <span id={classes.product_name}>{item.name}</span>

          <div className={classes.price}>
            <span>Php: {item.price}</span>
            <Delete_button id={item.id} />
            <Add_button title={"Add to Cart"} item={item} id={item.id} />
            <Add_quantity_Button id={item.id} />
          </div>
        </div>
      ))}
    </div>
  ));

  return <div className={classes.products_container}>{renderedData}</div>;
};

export default React.memo(Home);
