import { CANCEL_SALE } from "../../types/SaleType";

import axios from "axios";

const cancelSaleAction = (id) => {
	return {
		type: CANCEL_SALE,
		payload: {id},
	};
};

export const cancelSale = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "delete",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `sale-invoice/${id}`,

			});
			//dispatching data
			dispatch(cancelSaleAction(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
