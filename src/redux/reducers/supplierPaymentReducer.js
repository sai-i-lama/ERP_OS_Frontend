import {
	SUPPLIERS_PAYMENT,
	ADD_SUPPLIER_PAYMENT,
	ADD_SUPPLIER_PAYMENT_ERROR,
	SUPPLIER_DETAILS_PAYMENT,
	DELETE_SUPPLIER_PAYMENT,
} from "../types/SupplierPaymentType";
import { message } from "antd";

const initialState = {
	list: null,
	supplierPayment: null,
	total: null,
};

const supplierPaymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case SUPPLIERS_PAYMENT:
			return {
				...state,
				list: action.payload.allTransaction,
				total: action.payload.aggregations,
			};
		case ADD_SUPPLIER_PAYMENT:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload.data.newPaymentSupplier);
			return { ...state, list };

		case SUPPLIER_DETAILS_PAYMENT:
			return { ...state, supplier: action.payload.data };

		case DELETE_SUPPLIER_PAYMENT:
			const filterSupplierPayment = state.list.filter(
				(sup) => sup.id !== parseInt(action.payload) && sup
			);

			return { ...state, list: filterSupplierPayment };

		// return {
		//   list: [
		//     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
		//   ],
		// };

		case ADD_SUPPLIER_PAYMENT_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default supplierPaymentReducer;
