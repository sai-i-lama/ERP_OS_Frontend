import axios from "axios";

const GetTotalPayment = async () => {
  const data = await axios.get(`transaction?query=info`);
  const totalPayment = data.data._count.id;
  return totalPayment;
};

export default GetTotalPayment;
