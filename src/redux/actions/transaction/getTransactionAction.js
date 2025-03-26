import { TRANSACTIONS } from "../../types/TransactionType";
import axios from "axios";

const getAllTransaction = (data) => {
	return {
		type: TRANSACTIONS,
		payload: data,
	};
};

export const loadAllTransaction = ({
	page,
	limit,
	startdate,
	enddate,
	status = true,
}) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`transaction?status=${status}&page=${page}&count=${limit}&startdate=${startdate}&enddate=${enddate}`
			);
			//dispatching data
			dispatch(getAllTransaction(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
