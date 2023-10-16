import axios from "axios";

const getDataHandler = async (host) => {
  const response = await axios
    .get(host)
    .then((res) => {
      getData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    response,
  };
};

export default getDataHandler;
