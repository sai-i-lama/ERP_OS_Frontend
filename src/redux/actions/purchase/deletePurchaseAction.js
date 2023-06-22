import { DELETE_PURCHASE } from "../../types/PurchaseType";

import axios from "axios";

const deletePurchaseAction = (id) => {
	return {
		type: DELETE_PURCHASE,
		payload: id,
	};
};

export const deletePurchase = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `purchase-invoice/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deletePurchaseAction(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
