import { DESIGNATIONS } from "../../types/DesignationType";
import axios from "axios";

const getDesignation = (data) => {
	return {
		type: DESIGNATIONS,
		payload: data,
	};
};

export const loadAllDesignation = () => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`designation?status=true`);
			//dispatching data
			dispatch(getDesignation(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
