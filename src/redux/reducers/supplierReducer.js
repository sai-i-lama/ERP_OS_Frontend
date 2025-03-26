import {
  SUPPLIERS,
  ADD_SUPPLIER,
  ADD_SUPPLIER_ERROR,
  SUPPLIER_DETAILS,
  DELETE_SUPPLIER,
} from "../types/SuppliersType";
import { message } from "antd";

const initialState = {
  list: null,
  supplier: null,
};

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUPPLIERS:
      return { ...state, list: action.payload };
    case ADD_SUPPLIER:
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload);
      return { ...state, list };

    case SUPPLIER_DETAILS:
      return { ...state, supplier: action.payload.data };

    case DELETE_SUPPLIER:
      const filterSupplier = state.list.filter(
        (sup) => sup.id !== parseInt(action.payload) && sup
      );

      return { ...state, list: filterSupplier };

    // return {
    //   list: [
    //     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
    //   ],
    // };

    case ADD_SUPPLIER_ERROR:
      message.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default supplierReducer;
