import { DESIGNATION_DETAILS } from "../../types/DesignationType";
import axios from "axios";

const detailDesignation = (data) => {
	return {
		type: DESIGNATION_DETAILS,
		payload: data,
	};
};

export const loadSingleDesignation = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const data = await axios.get(`designation/${id}`);
			//dispatching data
			dispatch(detailDesignation(data));
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};
};
