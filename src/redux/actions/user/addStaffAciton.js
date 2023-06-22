import { ADD_STAFF } from "../../types/UserType";
import axios from "axios";
import { toast } from "react-toastify";

const addStaffAction = (data) => {
	return {
		type: ADD_STAFF,
		payload: data,
	};
};

export const addStaff = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `user/register`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addStaffAction(data));
			toast.success("Registration successful");

			return "success";
		} catch (error) {
			toast.error("Error in adding staff try again");
			console.log(error.message);
			return "error";
		}
	};
};
