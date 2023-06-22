import axios from "axios";

const getAllAccount = async () => {
	const data = await axios.get(`account?query=sa`);
	const allAccount = data.data;
	return allAccount;
};

export default getAllAccount;
