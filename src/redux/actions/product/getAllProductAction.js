import { PRODUCTS } from "../../types/ProductType";

import axios from "axios";

const getAllProductAction = (data) => {
	return {
		type: PRODUCTS,
		payload: data,
	};
};

export const loadProduct = ({ page, limit, status }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`product?status=${status}&page=${page}&count=${limit}`
			);
			//dispatching data
			dispatch(getAllProductAction(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
