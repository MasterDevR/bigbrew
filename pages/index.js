import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import classes from "@/styles/home.module.css";
import { useRouter } from "next/router";
import Add_button from "@/components/layout/Add_button";

const Home = () => {
  const [data, getData] = useState([]);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      const itemData = localStorage.getItem("ItemData");
      console.log("itemData:", itemData);

      if (itemData) {
        axios
          .post(`http://localhost:3000/api/controller/admin/post_sales`, {
            itemData,
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Order Verified");
              localStorage.removeItem("ItemData");
              router.push("/");
            } else {
              alert("Order verification failed. Please try again.");
            }
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }

    axios
      .get("http://localhost:3000/api/controller/admin/getData")
      .then((res) => {
        getData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const groupedData = data?.reduce((result, item) => {
    if (!result[item.category]) {
      result[item.category] = [];
    }
    result[item.category].push(item);
    return result;
  }, {});

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
            <Add_button title={"Add to Cart"} item={item} id={item.id} />
          </div>
        </div>
      ))}
    </div>
  ));

  return <div className={classes.products_container}>{renderedData}</div>;
};

export default React.memo(Home);
