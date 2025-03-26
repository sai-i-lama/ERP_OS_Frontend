import { DASHBOARD } from "../types/DashboardType";

const initialState = {
  list: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD:
      return { ...state, list: action.payload };

    default:
      return state;
  }
};

export default dashboardReducer;
