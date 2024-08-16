import { LOGS } from "../types/AuditLogsType";

const initialState = {
  list: [],
  total: 0,
};

const logsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGS:
      return {
        ...state,
        list: action.payload.logs || [], // Assurez-vous que 'logs' existe dans le payload
        total: action.payload.total || 0, // Assurez-vous que 'total' existe dans le payload
      };
    default:
      return state;
  }
};

export default logsReducer;
