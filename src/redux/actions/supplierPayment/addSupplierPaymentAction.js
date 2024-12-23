import { ADD_SUPPLIER_PAYMENT } from "../../types/SupplierPaymentType";
import axios from "axios";

const addSupplierPaymentAction = (data) => {
	return {
		type: ADD_SUPPLIER_PAYMENT,
		payload: data,
	};
};

export const addSupplierPayment = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `payment-purchase-invoice/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addSupplierPaymentAction(data));
			return "success";
		} catch (error) {
			console.log(error.message);
		}
	};
};
