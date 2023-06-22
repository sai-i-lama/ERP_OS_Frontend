import axios from "axios";

const getTotalProduct = async () => {
  const data = await axios.get(`product?query=info`);
  const totalProduct = data.data._count.id;
  return totalProduct;
};

export default getTotalProduct;
