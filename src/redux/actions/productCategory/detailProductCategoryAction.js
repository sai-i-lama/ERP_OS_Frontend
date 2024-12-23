import { PRODUCT_CATEGORY_DETAILS } from "../../types/ProductCategoryType";
import axios from "axios";

const detailProductCategory = (data) => {
	return {
		type: PRODUCT_CATEGORY_DETAILS,
		payload: data,
	};
};

export const loadSingleProductCategory = (id) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const data = await axios.get(`product-category/${id}`);
			//dispatching data
			dispatch(detailProductCategory(data));
			return data;
		} catch (error) {
			console.log(error.message);
		}
	};
};
