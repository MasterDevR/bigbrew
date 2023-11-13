import React, { useEffect, useState } from "react";
import classes from "@/styles/input.module.css";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const Input = ({ addProductHandler }) => {
  const [rowData, setRowData] = useState([
    { category: "", name: "", image: "", price: "" },
  ]);

  const addRowHandler = () => {
    const hasEmptyValues = rowData.some(
      (data) =>
        data.category === "" ||
        data.name === "" ||
        data.image === "" ||
        data.price === ""
    );

    if (hasEmptyValues) {
      alert("Cannot add a new row if previews row has empty field.");
      return;
    }

    setRowData((prevData) => [
      ...prevData,
      { category: "", name: "", image: "", price: "" },
    ]);
  };

  const removeRowHandler = (index, event) => {
    setRowData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...rowData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setRowData(updatedData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(rowData);
  };

  const hideAddproductHandler = () => {
    addProductHandler(false);
  };
  return (
    <>
      <div className={classes.overlay} onClick={hideAddproductHandler}></div>
      <form method="post" className={classes.container}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((data, index) => (
              <tr key={index}>
                <td>
                  {index === rowData.length - 1 && (
                    <RiPlayListAddLine size={"2rem"} onClick={addRowHandler} />
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    name="category"
                    value={data.category}
                    placeholder="Product Category"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Product Name"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    name="image"
                    value={data.image}
                    placeholder="Produce Image"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={data.price}
                    placeholder="Product Price"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  {rowData.length !== 1 && index === rowData.length - 1 && (
                    <MdDelete
                      size={"2rem"}
                      onClick={() => removeRowHandler(index)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </>
  );
};

export default React.memo(Input);
