import {
  CUSTOMERS,
  ADD_CUSTOMER,
  ADD_CUSTOMER_ERROR,
  CUSTOMER_DETAILS,
  DELETE_CUSTOMER,
} from "../types/CustomerType";
import { message } from "antd";

const initialState = {
  list: null,
  customer: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMERS:
      return { ...state, list: action.payload };
    case ADD_CUSTOMER:
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload);
      return { ...state, list };

    case CUSTOMER_DETAILS:
      return { ...state, customer: action.payload.data };

    case DELETE_CUSTOMER:
      const filterCustomer = state.list.filter(
        (cust) => cust.id !== parseInt(action.payload) && cust
      );

      return { ...state, list: filterCustomer };

    // return {
    //   list: [
    //     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
    //   ],
    // };

    case ADD_CUSTOMER_ERROR:
      message.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default customerReducer;
