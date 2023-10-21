import React, { createContext, useEffect, useReducer, useState } from "react";

export const storeHanlder = createContext();

const defaultStoreState = {
  quantity: 0,
  total_price: 0,
  cartItems: [],
  isCart: false,
};

const storeReducer = (state, action) => {
  if (action.type === "addToCart") {
    const newItem = action.item;
    const existingItem = state.cartItems.find((item) => item.id === newItem.id);

    if (!existingItem) {
      console.log(newItem.category);
      state.total_price = state.total_price + newItem.price;
      state.cartItems.push({
        id: newItem.id,
        name: newItem.name,
        category: newItem.category,
        price: newItem.price,
        originalPrice: newItem.price,
        src: newItem.photo,
        quantity: 1,
      });
    } else {
      existingItem.quantity += 1;
      existingItem.price = existingItem.quantity * existingItem.originalPrice;
    }
    // get sum of quantity for each item
    let updatedToQuantity = state.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    // get sum of price for each item

    let totalPRice = state.cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    return {
      ...state,
      cartItems: state.cartItems,
      total_price: totalPRice,
      quantity: updatedToQuantity,
    };
  }

  if (action.type === "removeItem") {
    const itemId = action.id;
    const existingItem = state.cartItems.find((item) => {
      return item.id === itemId;
    });

    if (existingItem) {
      if (existingItem.quantity === 1) {
        const updatedItem = state.cartItems.filter(
          (item) => item.id !== itemId
        );

        return {
          ...state,
          quantity: state.quantity - 1,
          total_price: state.total_price - existingItem.originalPrice,
          cartItems: updatedItem,
        };
      } else {
        let updatedItems = state.cartItems.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              price: (item.quantity - 1) * item.originalPrice,
              quantity: --item.quantity,
            };
          }
          return item;
        });

        return {
          ...state,
          quantity: state.quantity - 1,
          total_price: state.total_price - existingItem.originalPrice,
          cartItems: updatedItems,
        };
      }
    }
  }
  if (action.type === "addItem") {
    const itemId = action.id;
    const existingItem = state.cartItems.find((item) => {
      return item.id === itemId;
    });

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.price = existingItem.quantity * existingItem.originalPrice;
      // get sum of quantity for each item

      let updatedToQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      // get sum of price for each item
      let totalPRice = state.cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        ...state,
        total_price: totalPRice,
        quantity: updatedToQuantity,
      };
    }
  }
  if (action.type === "checkOut") {
    return {
      quantity: 0,
      total_price: 0,
      cartItems: [],
    };
  }

  if (action.type === "showCart") {
    return { ...state, isCart: !state.isCart };
  }

  return state;
};

const context = (props) => {
  const [storeState, dispatchStore] = useReducer(
    storeReducer,
    defaultStoreState
  );

  const addToCartHandler = (item) => {
    dispatchStore({ type: "addToCart", item });
  };
  const removeItemHandler = (id) => {
    dispatchStore({ type: "removeItem", id });
  };
  const addItemHandler = (id) => {
    dispatchStore({ type: "addItem", id });
  };
  const checkOut = () => {
    dispatchStore({ type: "checkOut" });
  };
  const showCart = () => {
    dispatchStore({ type: "showCart" });
  };

  const storeContext = {
    showCart: showCart,
    checkOut: checkOut,
    addItemHandler: addItemHandler,
    addToCartHandler: addToCartHandler,
    removeItemHandler: removeItemHandler,
    quantity: storeState.quantity,
    total_price: storeState.total_price,
    cartItems: storeState.cartItems,
    isCart: storeState.isCart,
  };
  return (
    <storeHanlder.Provider value={storeContext}>
      {props.children}
    </storeHanlder.Provider>
  );
};

export default React.memo(context);
