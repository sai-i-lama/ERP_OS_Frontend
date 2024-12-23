import axios from "axios";

const getAllProduct = async () => {
  const data = await axios.get(`product?query=all`);
  const allProducts = data.data;
  return allProducts;
};

export default getAllProduct;
