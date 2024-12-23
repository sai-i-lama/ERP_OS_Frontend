import {
	PRODUCTS,
	ADD_PRODUCT,
	ADD_PRODUCT_ERROR,
	PRODUCT_DETAILS,
	DELETE_PRODUCT,
	POS_PRODUCT,
} from "../types/ProductType";
import { message } from "antd";

const initialState = {
	list: null,
	product: null,
	posProduct: null,
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS:
			return { ...state, list: action.payload };
		case ADD_PRODUCT:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.unshift(action.payload);
			return { ...state, list };

		case PRODUCT_DETAILS:
			return { ...state, product: action.payload.data };

		case POS_PRODUCT:
			return { ...state, posProduct: action.payload.data };

		case DELETE_PRODUCT:
			const filterProduct = state.list.filter(
				(prod) => prod.id !== parseInt(action.payload) && prod
			);

			return { ...state, list: filterProduct };

		// return {
		//   list: [
		//     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
		//   ],
		// };

		case ADD_PRODUCT_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default productReducer;
