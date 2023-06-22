import { ADD_PRODUCT_CATEGORY } from "../../types/ProductCategoryType";
import axios from "axios";
import { toast } from "react-toastify";

const addProductCategoryAction = (data) => {
	return {
		type: ADD_PRODUCT_CATEGORY,
		payload: data,
	};
};

export const addProductCategory = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `product-category/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addProductCategoryAction(data));
			toast.success("product category Added");
			return {
				message: "success",
			};
		} catch (error) {
			toast.error("Error in adding product category try again");
			console.log(error.message);
		}
	};
};
