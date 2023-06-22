import { ACCOUNT_DETAILS } from "../../types/AccountType";
import axios from "axios";

const detailAccountAction = (data) => {
	return {
		type: ACCOUNT_DETAILS,
		payload: data,
	};
};

export const loadSingleAccount = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "get",
				url: `account/${id}`,
			});

			dispatch(detailAccountAction(data));
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};
};
