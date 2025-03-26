import axios from "axios";
import { PRODUCT_CATEGORYS } from "../../types/ProductCategoryType";

const getAllProductCategory = (data) => {
	return {
		type: PRODUCT_CATEGORYS,
		payload: data,
	};
};

export const loadAllProductCategory = ({ page, limit }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`product-category?page=${page}&count=${limit}`
			);
			//dispatching data
			dispatch(getAllProductCategory(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
