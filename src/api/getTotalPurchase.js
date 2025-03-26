import axios from "axios";

const GetTotalPurchase = async () => {
  const data = await axios.get(`purchase-invoice?query=info`);
  const totalPurchase = data.data._count.id;
  return totalPurchase;
};

export default GetTotalPurchase;
