import axios from "axios";

const GetTotalSuppliers = async () => {
  const data = await axios.get(`supplier?query=info`);
  const totalSuppliers = data.data._count.id;
  return totalSuppliers;
};

export default GetTotalSuppliers;
