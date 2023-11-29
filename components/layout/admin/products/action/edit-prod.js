import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import classes from "@/styles/productList.module.css";

const EditProduct = (props) => {
  const [editedProduct, setEditedProduct] = useState({});

  const handleInputChange = (property, value) => {
    if (property === "src") {
      // If the property is "src" (file input), get the actual file
      const file = value[0]; // Assuming you only allow selecting one file
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [property]: file,
      }));
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [property]: value,
      }));
    }
  };
  const mappedProduct = props.products?.map((item, index) => (
    <tr key={item.id}>
      {!props.editingStates[index] ? (
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
          {props.editing && (
            <>
              <td
                className={classes.actionBTN}
                onClick={() => props.toggleEditing(index)}
              >
                <FiEdit color={"green"} />
              </td>
              <td
                className={classes.actionBTN}
                onClick={() => props.deleteHandler(item.id)}
              >
                <MdDeleteSweep color={"red"} />
              </td>
            </>
          )}
        </>
      ) : (
        <>
          <td>
            <input
              type="text"
              value={editedProduct.category || item.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editedProduct.name || item.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </td>
          <td>
            <div className={classes.srcDiv}>
              <input
                type="file"
                onChange={(e) => handleInputChange("src", e.target.files)}
              />
              <img
                src={`/images/${item.photo}`}
                alt={item.name}
                className={classes.product_image}
              />
            </div>
          </td>

          <td>
            <input
              type="text"
              value={editedProduct.price || item.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </td>
          <td
            className={classes.actionBTN}
            onClick={() => props.toggleEditing(index)}
          >
            <span style={{ color: "red" }}>Cancel</span>
          </td>
          <td
            className={classes.actionBTN}
            onClick={() => props.deleteHandler(item.id)}
          >
            <MdDeleteSweep color={"red"} />
          </td>
          {!props.editingStates[index] ? (
            <td></td>
          ) : (
            <td
              className={classes.actionBTN}
              onClick={() => props.submitHandler(editedProduct, item.id)}
            >
              <span style={{ color: "green" }}>Save</span>
            </td>
          )}
        </>
      )}
    </tr>
  ));

  return <>{mappedProduct}</>;
};

export default EditProduct;
