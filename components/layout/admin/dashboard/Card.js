import React, { useEffect, useState } from "react";
import classes from "@/styles/card.module.css";
import axios from "axios";
import Image from "next/image";
const Card = () => {
  const [data, setData] = useState([]);
  const url = `http://localhost:3001/getSales`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => {});
  }, [url]);

  const bestItem = data.reduce((quantitySale, currentItem) => {
    if (
      currentItem.quantity_sale >
      (quantitySale ? quantitySale.quantity_sale : 0)
    ) {
      return currentItem;
    }
    return quantitySale;
  }, 0);

  const bestItemArray = bestItem ? [bestItem] : [];

  const mappedItem = bestItemArray.map((item) => {
    return (
      <div key={item.id} className={classes.card}>
        <Image
          src={`/images/${item.photo}`}
          width={100}
          height={100}
          alt={item.product}
          id={classes.image}
        />
        <span>Best Seller: </span>
        <span>{item.product}</span>
      </div>
    );
  });

  console.log(bestItem);

  return <div className={classes.card_container}>{mappedItem}</div>;
};

export default React.memo(Card);
