import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import classes from "@/styles/productList.module.css";
import EditProduct from "./action/edit-prod";
import EditProductCat from "./action/edit-prod-cat";
import Inputfeild from "./Input";
import Product_header from "./Product_header";
const Product = () => {
  const [data, getData] = useState([]);
  const [category, setCategory] = useState(["All Product"]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [isAddProduct, setAddProduct] = useState(false);
  const [editing, setEditing] = useState(false);
  const url = `http://localhost:3001/products`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        getData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  const sortedData = data.sort((a, b) => {
    return a.category.localeCompare(b.category);
  });

  useEffect(() => {
    let uniqueCategories = new Set(sortedData.map((item) => item.category));

    setCategory((prevData) => [...prevData, ...uniqueCategories]);
  }, [sortedData]);

  const [editingStates, setEditingStates] = useState(data.map(() => false));

  const toggleEditing = (index) => {
    const newEditingStates = [...editingStates];
    newEditingStates[index] = !newEditingStates[index];
    setEditingStates(newEditingStates);
  };

  const submitHandler = (item) => {
    console.log(item);
  };
  const deleteHandler = (id) => {
    console.log("item ID to delete : " + id);
  };
  const addProductHandler = () => {
    setAddProduct((prevData) => {
      return !prevData;
    });
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const products =
    selectedCategory === "All Product" ? (
      <EditProduct
        products={data}
        toggleEditing={toggleEditing}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
        editingStates={editingStates}
        editing={editing}
      />
    ) : (
      <EditProductCat
        products={data}
        toggleEditing={toggleEditing}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
        editingStates={editingStates}
        editing={editing}
        selectedCategory={selectedCategory}
      />
    );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const SelectedItem = category.map((item, index) => {
    return (
      <option key={index} value={item} className={classes.option}>
        {item}
      </option>
    );
  });
  const editHandler = () => {
    setEditing((prevData) => !prevData);
  };
  return (
    <>
      {isAddProduct && <Inputfeild addProductHandler={addProductHandler} />}
      <div className={classes.container}>
        <header className={classes.header}>
          <Product_header
            SelectedItem={SelectedItem}
            addProductHandler={addProductHandler}
            editHandler={editHandler}
            handleChange={handleChange}
          />
        </header>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Product Name</th>
              <th>Image</th>
              <th>Price</th>
              {editing && (
                <>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Save</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </table>
      </div>
    </>
  );
};

export default Product;
