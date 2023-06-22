import {
	ADD_DESIGNATION,
	DELETE_DESIGNATION,
	DESIGNATIONS,
	ADD_DESIGNATION_ERROR,
	DESIGNATION_DETAILS,
} from "../types/DesignationType";
import { message } from "antd";

const initialState = {
	list: null,
	designation: null,
};

const designationReducer = (state = initialState, action) => {
	switch (action.type) {
		case DESIGNATIONS:
			return { ...state, list: action.payload };
		case ADD_DESIGNATION:
			if (!Array.isArray(state.list)) {
				state.list = [];
			}
			const list = [...state.list];
			list.push(action.payload);
			return { ...state, list };

		case DESIGNATION_DETAILS:
			return { ...state, designation: action.payload.data };

		case DELETE_DESIGNATION:
			const filterDesignation = state.list.filter(
				(desig) => desig.id !== parseInt(action.payload) && desig
			);

			return { ...state, list: filterDesignation };

		case ADD_DESIGNATION_ERROR:
			message.error(action.payload);
			return state;
		default:
			return state;
	}
};

export default designationReducer;
