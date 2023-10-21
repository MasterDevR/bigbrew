import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "@/styles/products.module.css";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
const ProductsDetails = () => {
  const [data, getData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const products = currentItems.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.category}</td>
        <td>{item.name}</td>
        <td>{item.photo}</td>
        <td>{item.price}</td>
      </tr>
    );
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagination = pageNumbers.map((number) => (
    <button key={number} onClick={() => handlePageChange(number)}>
      {number}
    </button>
  ));
  const forwarHandler = () => {
    setCurrentPage((prev) => {
      if (prev >= pagination.length) {
        return prev;
      }
      return (prev = prev + 1);
    });
  };
  const backwardHandler = () => {
    setCurrentPage((prev) => {
      if (prev === 1) {
        return prev;
      }
      return (prev = prev - 1);
    });
  };
  return (
    <div className={classes.container}>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </table>

      <div className={classes.pagination}>
        <AiFillBackward id={classes.action} onClick={backwardHandler} />
        {pagination}
        <AiFillForward id={classes.action} onClick={forwarHandler} />
      </div>
    </div>
  );
};

export default ProductsDetails;
