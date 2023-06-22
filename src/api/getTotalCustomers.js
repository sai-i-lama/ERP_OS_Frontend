import axios from "axios";

const GetTotalCustomers = async () => {
  const data = await axios.get(`customer?query=info`);
  const totalCustomers = data.data._count.id;
  return totalCustomers;
};

export default GetTotalCustomers;
