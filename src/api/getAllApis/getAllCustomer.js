import axios from "axios";

const getAllCustomer = async () => {
  const data = await axios.get(`customer?query=all`);
  const allCustomers = data.data;
  return allCustomers;
};

export default getAllCustomer;
