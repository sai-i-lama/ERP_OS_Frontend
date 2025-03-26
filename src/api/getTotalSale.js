import axios from "axios";

const GetTotalSale = async () => {
  const data = await axios.get(`sale-invoice?query=info`);
  const totalSale = data.data._count.id;
  return totalSale;
};

export default GetTotalSale;
