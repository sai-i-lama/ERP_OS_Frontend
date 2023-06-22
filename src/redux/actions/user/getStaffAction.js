import { STAFFS } from "../../types/UserType";
import axios from "axios";

const getStaff = (data) => {
	return {
		type: STAFFS,
		payload: data,
	};
};

export const loadAllStaff = ({ status }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`user?status=${status}`);
			//dispatching data
			dispatch(getStaff(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
