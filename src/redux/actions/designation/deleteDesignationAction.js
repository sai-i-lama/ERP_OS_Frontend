import { DELETE_DESIGNATION } from "../../types/DesignationType";
import axios from "axios";

const deleteDesignationAction = (id) => {
	return {
		type: DELETE_DESIGNATION,
		payload: id,
	};
};

export const deleteDesignation = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `designation/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteDesignationAction(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
