import { AiFillBackward, AiFillForward } from "react-icons/ai";
import classes from "@/styles/products.module.css";

const Navigate = (props) => {
  const pagination = props.pageNumbers.map((number) => (
    <button key={number} onClick={() => props.handlePageChange(number)}>
      {number}
    </button>
  ));
  const forwarHandler = () => {
    props.setCurrentPage((prev) => {
      if (prev >= pagination.length) {
        return prev;
      }
      return (prev = prev + 1);
    });
  };
  const backwardHandler = () => {
    props.setCurrentPage((prev) => {
      if (prev === 1) {
        return prev;
      }
      return (prev = prev - 1);
    });
  };
  return (
    <div className={classes.pagination}>
      <AiFillBackward id={classes.action} onClick={backwardHandler} />
      {pagination}
      <AiFillForward id={classes.action} onClick={forwarHandler} />
    </div>
  );
};

export default Navigate;
