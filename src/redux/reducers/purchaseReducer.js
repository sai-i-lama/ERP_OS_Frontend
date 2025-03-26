import {
	PURCHASES,
	ADD_PURCHASE,
	ADD_PURCHASE_ERROR,
	PURCHASE_DETAILS,
	DELETE_PURCHASE,
} from "../types/PurchaseType";
import { message } from "antd";

const initialState = {
	list: null,
	purchase: null,
	total: null,
};

const purchaseReducer = (state = initialState, action) => {
	switch (action.type) {
		case PURCHASES:
			return {
				...state,
				list: action.payload.allPurchaseInvoice,
				total: action.payload.aggregations,
			};
		case ADD_PURCHASE:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			return { ...state, list };

		case PURCHASE_DETAILS:
			return { ...state, purchase: action.payload.data };

		case DELETE_PURCHASE:
			const filterPurchase = state.list.filter(
				(purchase) => purchase.id !== parseInt(action.payload) && purchase
			);

			return { ...state, list: filterPurchase };

		// return {
		//   list: [
		//     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
		//   ],
		// };

		case ADD_PURCHASE_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default purchaseReducer;
