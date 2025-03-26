import { LOTS } from "../types/LotProductType";

const initialState = {
  list: [],
  total: 0,
};

const lotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOTS:
      return {
        ...state,
        list: action.payload.lots || [], // Assurez-vous que 'logs' existe dans le payload
        total: action.payload.total || 0, // Assurez-vous que 'total' existe dans le payload
      };
    default:
      return state;
  }
};

export default lotsReducer;
