import { ACCOUNTS } from "../../types/AccountType";
import axios from "axios";

const getAllAccount = (data) => {
	return {
		type: ACCOUNTS,
		payload: data,
	};
};

export const loadAllAccount = () => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`account?query=sa`);
			//dispatching data
			dispatch(getAllAccount(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
