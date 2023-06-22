import { DELETE_PRODUCT } from "../../types/ProductType";
import axios from "axios";

const deleteProductAction = (id) => {
	return {
		type: DELETE_PRODUCT,
		payload: id,
	};
};

export const deleteProduct = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `product/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteProductAction(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
