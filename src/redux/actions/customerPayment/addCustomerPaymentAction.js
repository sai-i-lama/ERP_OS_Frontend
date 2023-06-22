import { ADD_CUSTOMER_PAYMENT } from "../../types/CustomerPaymentType";
import axios from "axios";
import { toast } from "react-toastify";

const addCustomerPaymentAction = (data) => {
	return {
		type: ADD_CUSTOMER_PAYMENT,
		payload: data,
	};
};

export const addCustomerPayment = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `payment-sale-invoice/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addCustomerPaymentAction(data));
			return "success";
		} catch (error) {
			toast.error("Something went wrong in payment");
			console.log(error.message);
		}
	};
};
