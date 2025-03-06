import {
	ACCOUNTS,
	ADD_ACCOUNT,
	ADD_ACCOUNT_ERROR,
	ACCOUNT_DETAILS,
	DELETE_ACCOUNT,
} from "../types/AccountType";
import { message } from "antd";

const initialState = {
	list: null,
	account: null,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACCOUNTS:
			return { ...state, list: action.payload };
		case ADD_ACCOUNT:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			return { ...state, list };

		case ACCOUNT_DETAILS:
			return { ...state, account: action.payload };

		case DELETE_ACCOUNT:
			const filterAccount = state.list.filter(
				(acc) => acc.id !== parseInt(action.payload) && acc
			);

			return { ...state, list: filterAccount };

		// return {
		//   list: [
		//     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
		//   ],
		// };

		case ADD_ACCOUNT_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default accountReducer;
