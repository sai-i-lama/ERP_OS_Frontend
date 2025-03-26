import { DELETE_PRODUCT_CATEGORY } from "../../types/ProductCategoryType";
import axios from "axios";

const deleteProductCategory = (id) => {
	return {
		type: DELETE_PRODUCT_CATEGORY,
		payload: id,
	};
};

export const DeleteProductCategory = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			await axios({
				method: "patch",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `product-category/${id}`,
				data: {
					status: false,
				},
			});
			//dispatching data
			dispatch(deleteProductCategory(id));
		} catch (error) {
			console.log(error.message);
		}
	};
};
