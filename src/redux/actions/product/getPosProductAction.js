import { POS_PRODUCT } from "../../types/ProductType";

import axios from "axios";

const posProductAction = (data) => {
	return {
		type: POS_PRODUCT,
		payload: data,
	};
};

export const loadPosProduct = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`product?query=search&prod=${id}`);

			//dispatching data
			dispatch(posProductAction(data));

			return { status: "success", data: data };
		} catch (error) {
			console.log(error.message);
		}
	};
};
