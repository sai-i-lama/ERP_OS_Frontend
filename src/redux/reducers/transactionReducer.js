import {
	ADD_TRANSACTION,
	DELETE_TRANSACTION,
	TRANSACTIONS,
	ADD_TRANSACTION_ERROR,
	TRANSACTION_DETAILS,
} from "../types/TransactionType";
import { message } from "antd";

const initialState = {
	list: null,
	transaction: null,
	total: null,
};

const transactionReducer = (state = initialState, action) => {
	switch (action.type) {
		case TRANSACTIONS:
			return {
				...state,
				list: action.payload.allTransaction,
				total: action.payload.aggregations,
			};
		case ADD_TRANSACTION:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload.data.newPaymentSupplier);
			return { ...state, list };

		case TRANSACTION_DETAILS:
			return { ...state, transaction: action.payload.data };

		case DELETE_TRANSACTION:
			const filtertransaction = state.list.filter(
				(sup) => sup.id !== parseInt(action.payload) && sup
			);

			return { ...state, list: filtertransaction };

		// return {
		//   list: [
		//     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
		//   ],
		// };

		case ADD_TRANSACTION_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default transactionReducer;
