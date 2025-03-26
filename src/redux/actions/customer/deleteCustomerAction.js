import { DELETE_CUSTOMER } from "../../types/CustomerType";
import axios from "axios";

const deleteCustomerAction = (id) => {
	return {
		type: DELETE_CUSTOMER,
		payload: id,
	};
};

export const deleteCustomer = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `customer/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteCustomerAction(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
