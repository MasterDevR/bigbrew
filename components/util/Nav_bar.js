import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import BigbrewLogo from "@/public/images/logo.png";
import classes from "@/styles/Nav_bar.module.css";

import { useState, useEffect, useContext } from "react";
import { storeHanlder } from "../store/context";
const Nav_bar = () => {
  const ctx = useContext(storeHanlder);
  const [totalItems, setTotalItems] = useState(0);
  const [colorChange, setColorchange] = useState(false); // Nav Bar Color changing

  // Nav Bar Color changing
  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY > 0) {
        setColorchange(true);
      } else {
        setColorchange(false);
      }
    };
    window.addEventListener("scroll", changeNavbarColor);
    return () => {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  // store store quantity

  useEffect(() => {
    setTotalItems(ctx.quantity);
    // console.log(ctx.cartItems);
    // console.log("Nav: " + typeof ctx.total_price);
    // console.log("Nav: " + ctx.total_price);
  }, [ctx.quantity]);

  return (
    <nav
      className={
        colorChange ? `${classes.nav} ${classes.colorChange}` : classes.nav
      }
    >
      <Link href="/">
        <div className={classes.imgLink}>
          <Image
            src={BigbrewLogo}
            width={100}
            height={100}
            alt="Bigbrew"
            priority
            as="image"
          />
          BIG BREW
        </div>
      </Link>
      <Link href="about">About Us</Link>
      <Link href="viewCart">
        <div className={`${classes.imgLink} ${classes.cart}`}>
          <div className={classes.cartBTN}>
            <span>{totalItems}</span>
            <AiOutlineShoppingCart size={"3rem"} />
          </div>
          View Cart
        </div>
      </Link>
    </nav>
  );
};

export default React.memo(Nav_bar);
