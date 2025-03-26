import { SUPPLIERS } from "../../types/SuppliersType";
import axios from "axios";

const getSuppliers = (data) => {
	return {
		type: SUPPLIERS,
		payload: data,
	};
};

export const loadSuppliers = ({ page, limit, status }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`supplier?status=${status}&page=${page}&count=${limit}`
			);
			//dispatching data
			dispatch(getSuppliers(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
