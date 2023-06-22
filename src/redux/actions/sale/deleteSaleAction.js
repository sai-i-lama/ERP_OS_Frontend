import { DELETE_SALE } from "../../types/SaleType";

import axios from "axios";

const deleteSaleAction = (id) => {
	return {
		type: DELETE_SALE,
		payload: id,
	};
};

export const deleteSale = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `sale-invoice/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteSaleAction(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
