import { ADD_TRANSACTION } from "../../types/TransactionType";
import axios from "axios";

const addTransactionAction = (data) => {
	return {
		type: ADD_TRANSACTION,
		payload: data,
	};
};

export const addTransaction = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `transaction/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addTransactionAction(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
