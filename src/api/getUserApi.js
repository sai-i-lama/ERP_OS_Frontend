import axios from "axios";

const getUserApi = async (id) => {
	const data = await axios.get(`user/${id}`);
	console.log(data);
	return data;
};

export default getUserApi;
