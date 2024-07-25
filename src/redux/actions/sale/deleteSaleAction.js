import { DELETE_SALE } from "../../types/SaleType";

import axios from "axios";

const deleteSaleAction = (id, updateData) => {
	return {
		type: DELETE_SALE,
		payload: {id, updateData} ,
	};
};

export const deleteSale = (id, updateData) => {
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
				data: updateData,
			});
			//dispatching data
			dispatch(deleteSaleAction(id, updateData));
		} catch (error) {
			console.log(error.message);
		}
	};
};
