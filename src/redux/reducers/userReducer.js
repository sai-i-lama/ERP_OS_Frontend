import {
	ADD_STAFF,
	LOGIN_USER,
	STAFFS,
	ADD_USER_ERROR,
	DETAIL_STAFF,
	DELETE_STAFF,
} from "../types/UserType";
import { message } from "antd";

const initialState = {
	list: null,
	user: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case STAFFS:
			return {
				...state,
				list: action.payload,
			};
		case ADD_STAFF:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			return { ...state, list };

		case LOGIN_USER:
			if (!Array.isArray(state.user)) {
				state.user = [];
			}
			const user = [...state.user];
			user.push(action.payload);
			return { ...state, user };

		case DETAIL_STAFF:
			return { ...state, user: action.payload.data };

		case DELETE_STAFF:
			const filterUser = state.list.filter(
				(staff) => staff.id !== parseInt(action.payload) && staff
			);

			return { ...state, list: filterUser };

		// return {
		//   list: [
		//     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
		//   ],
		// };

		case ADD_USER_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default userReducer;
