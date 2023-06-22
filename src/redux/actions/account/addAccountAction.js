import { ADD_ACCOUNT } from "../../types/AccountType";
import axios from "axios";
import { toast } from "react-toastify";

const addAccountAction = (data) => {
	return {
		type: ADD_ACCOUNT,
		payload: data,
	};
};

export const addAccount = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `account/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addAccountAction(data));
			return "success";
		} catch (error) {
			toast.error("Error in adding account");
			console.log(error.message);
		}
	};
};
