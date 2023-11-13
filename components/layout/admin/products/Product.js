import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import classes from "@/styles/productList.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import Inputfeild from "./Input";
import Product_header from "./Product_header";
const Product = () => {
  const [data, getData] = useState([]);
  const [category, setCategory] = useState(["All Product"]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [isAddProduct, setAddProduct] = useState(false);
  const [editing, setEditing] = useState(false);
  const url = `http://localhost:3000/api/controller/admin/getData`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        getData(res.data);
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

  const submitHandler = (id) => {
    console.log("item ID to save : " + id);
  };
  const deleteHandler = (id) => {
    console.log("item ID to delete : " + id);
  };
  const addProductHandler = () => {
    setAddProduct((prevData) => {
      return !prevData;
    });
  };

  // display product
  const products =
    selectedCategory === "All Product"
      ? data.map((item, index) => (
          <tr key={item.id}>
            {/* get product index */}
            {!editingStates[index] ? (
              <>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={`/images/${item.photo}`}
                    alt={item.name}
                    className={classes.product_image}
                  />
                </td>
                <td>{item.price}</td>
                {/* display action button if editing  */}
                {editing && (
                  <>
                    <td
                      className={classes.actionBTN}
                      onClick={() => toggleEditing(index)}
                    >
                      <FiEdit color={"green"} />
                    </td>
                    <td
                      className={classes.actionBTN}
                      onClick={() => deleteHandler(item.id)}
                    >
                      <MdDeleteSweep color={"red"} />
                    </td>
                  </>
                )}
              </>
            ) : (
              <>
                {/*display input feild if editing*/}

                <td>
                  <input type="text" defaultValue={item.category} />
                </td>
                <td>
                  <input type="text" defaultValue={item.name} />
                </td>
                <td>
                  <div className={classes.srcDiv}>
                    <input type="file" />

                    <img
                      src={`/images/${item.photo}`}
                      alt={item.name}
                      className={classes.product_image}
                    />
                  </div>
                </td>
                <td>
                  <input type="text" defaultValue={item.price} />
                </td>
                <td
                  className={classes.actionBTN}
                  onClick={() => toggleEditing(index)}
                >
                  <span style={{ color: "red" }}>Cancel</span>
                </td>

                <td
                  className={classes.actionBTN}
                  onClick={() => deleteHandler(item.id)}
                >
                  <MdDeleteSweep color={"red"} />
                </td>
                {!editingStates[index] ? (
                  <td></td>
                ) : (
                  <td
                    className={classes.actionBTN}
                    onClick={() => submitHandler(item.id)}
                  >
                    <span style={{ color: "green" }}>Save</span>
                  </td>
                )}
              </>
            )}
          </tr>
        ))
      : data // display filtered data
          .filter((item) => item.category === selectedCategory)
          .map((item, index) => (
            <tr key={item.id}>
              {!editingStates[index] ? (
                <>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={`/images/${item.photo}`}
                      alt={item.name}
                      className={classes.product_image}
                    />
                  </td>
                  <td>{item.price}</td>
                  {editing && (
                    <>
                      <td
                        className={classes.actionBTN}
                        onClick={() => toggleEditing(index)}
                      >
                        <FiEdit color={"green"} />
                      </td>
                      <td
                        className={classes.actionBTN}
                        onClick={() => deleteHandler(item.id)}
                      >
                        <MdDeleteSweep color={"red"} />
                      </td>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/*display input feild if editing*/}
                  <td>
                    <input type="text" defaultValue={item.category} />
                  </td>
                  <td>
                    <input type="text" defaultValue={item.name} />
                  </td>
                  <td>
                    <div className={classes.srcDiv}>
                      <input type="file" />

                      <img
                        src={`/images/${item.photo}`}
                        alt={item.name}
                        className={classes.product_image}
                      />
                    </div>
                  </td>
                  <td>
                    <input type="text" defaultValue={item.price} />
                  </td>
                  <td
                    className={classes.actionBTN}
                    onClick={() => toggleEditing(index)}
                  >
                    <span style={{ color: "red" }}>Cancel</span>
                  </td>
                  <td
                    className={classes.actionBTN}
                    onClick={() => deleteHandler(item.id)}
                  >
                    <MdDeleteSweep color={"red"} />
                  </td>
                  {!editingStates[index] ? (
                    <td></td>
                  ) : (
                    <td
                      className={classes.actionBTN}
                      onClick={() => submitHandler(item.id)}
                    >
                      <span style={{ color: "green" }}>Save</span>
                    </td>
                  )}
                </>
              )}
            </tr>
          ));

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
