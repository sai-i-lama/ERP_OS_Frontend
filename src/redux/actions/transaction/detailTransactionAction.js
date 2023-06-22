import { TRANSACTION_DETAILS } from "../../types/TransactionType";
import axios from "axios";

const detailTransactionAction = (data) => {
	return {
		type: TRANSACTION_DETAILS,
		payload: data,
	};
};

export const loadTransaction = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const data = await axios.get(`transaction/${id}`);
			//dispatching data
			dispatch(detailTransactionAction(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
