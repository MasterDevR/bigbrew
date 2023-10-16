import React, { createContext, useEffect, useReducer, useState } from "react";

export const storeHanlder = createContext();

const defaultStoreState = {
  quantity: 0,
  total_price: 0,
  cartItems: [],
};

const storeReducer = (state, action) => {
  if (action.type === "addToCart") {
    const productID = action.item.id;

    const isExistingIndex = state.cartItems.findIndex(
      (item) => item.id === productID
    );

    let updatedToQuantity = 0;
    let updatedTotalPrice = 0;
    let updatedCartItems;

    if (isExistingIndex !== -1) {
      updatedCartItems = [...state.cartItems];
      updatedCartItems[isExistingIndex].quantity += 1;
      updatedCartItems[isExistingIndex].total_price =
        updatedCartItems[isExistingIndex].quantity * action.item.price;

      console.log(updatedCartItems[isExistingIndex].quantity);
    } else {
      updatedTotalPrice = action.item.price;

      updatedCartItems = [
        ...state.cartItems,
        {
          ...action.item,
          quantity: 1,
          total_price: updatedTotalPrice,
        },
      ];
    }

    updatedToQuantity = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    updatedTotalPrice = updatedCartItems.reduce(
      (totalPrice, item) => totalPrice + item.total_price,
      0
    );

    return {
      ...state,
      cartItems: updatedCartItems,
      total_price: updatedTotalPrice,
      quantity: updatedToQuantity,
    };
  }

  if (action.type === "removeItem") {
    const itemToRemove = state.cartItems.find((item) => item.id === action.id);

    if (itemToRemove) {
      let updatedCartItems;
      let updatedQuantity;
      let updatedTotalPrice;

      if (itemToRemove.quantity === 1) {
        updatedTotalPrice = state.total_price - itemToRemove.price;
        updatedQuantity = state.quantity - 1;
        updatedCartItems = state.cartItems.filter(
          (item) => item.id !== action.id
        );
      } else {
        itemToRemove.quantity--;
        updatedTotalPrice = state.total_price - itemToRemove.price;
        updatedQuantity = state.quantity - 1;
        updatedCartItems = state.cartItems.map((item) => {
          if (item.id === action.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }

      return {
        ...state,
        cartItems: updatedCartItems,
        total_price: updatedTotalPrice,
        quantity: updatedQuantity,
      };
    }
  }

  // Return the original state if the action type is not "removeItem"
  return state;
};

// create reducer
const context = (props) => {
  const [storeContext, setStoreContext] = useState({});

  const [storeState, dispatchStore] = useReducer(
    storeReducer,
    defaultStoreState
  );

  useEffect(() => {
    setStoreContext({
      addToCartHandler: addToCartHandler,
      removeItemHandler: removeItemHandler,
      quantity: storeState.quantity,
      total_price: storeState.total_price,
      cartItems: storeState.cartItems,
    });
  }, [storeState]);
  // access
  const addToCartHandler = (item) => {
    dispatchStore({ type: "addToCart", item });
  };
  const removeItemHandler = (id) => {
    dispatchStore({ type: "removeItem", id });
  };

  // returned data

  return (
    <storeHanlder.Provider value={storeContext}>
      {props.children}
    </storeHanlder.Provider>
  );
};

export default React.memo(context);
