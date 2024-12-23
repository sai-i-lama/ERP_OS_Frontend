import { DELETE_SUPPLIER } from "../../types/SuppliersType";
import axios from "axios";

const deleteSuppliersAction = (id) => {
	return {
		type: DELETE_SUPPLIER,
		payload: id,
	};
};

export const deleteSupplier = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `supplier/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteSuppliersAction(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
