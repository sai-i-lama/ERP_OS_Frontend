import { CUSTOMERS } from "../../types/CustomerType";
import axios from "axios";

const getCustomer = (data) => {
	return {
		type: CUSTOMERS,
		payload: data,
	};
};

export const loadAllCustomer = ({ page, limit, status }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`customer?status=${status}&page=${page}&count=${limit}`
			);
			//dispatching data
			dispatch(getCustomer(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
