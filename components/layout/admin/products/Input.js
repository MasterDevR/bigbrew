import React, { useEffect, useState } from "react";
import classes from "@/styles/input.module.css";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Input = ({ addProductHandler }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
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
    const { name, files } = event.target;
    const updatedData = [...rowData];

    if (files && files.length > 0) {
      updatedData[index] = { ...updatedData[index], [name]: files[0] };
      setRowData(updatedData);
    } else {
      updatedData[index] = {
        ...updatedData[index],
        [name]: event.target.value,
      };
      setRowData(updatedData);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    rowData.forEach((data) => {
      formData.append(`category`, data.category);
      formData.append(`name`, data.name);
      formData.append(`file`, data.image);
      formData.append(`price`, data.price);
    });
    console.log("dta");
    axios
      .post("http://localhost:3001/postProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status === 200) {
          axios
            .post("http://localhost:3001/upload", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              console.log("upload " + response.status);
            })
            .catch((err) => {
              console.log("ERROR " + err);
            });
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log("ERROR " + err);
      });
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

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
                    placeholder="Product Category"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    name="image"
                    placeholder="Product Image"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  {rowData.length > 1 && (
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
