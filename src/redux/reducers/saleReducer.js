import {
  SALES,
  ADD_SALE,
  ADD_SALE_ERROR,
  SALE_DETAILS,
  DELETE_SALE,
} from "../types/SaleType";
import { message } from "antd";

const initialState = {
  list: null,
  sale: null,
  total: null,
};

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALES:
      return {
        ...state,
        list: action.payload.allSaleInvoice,
        total: action.payload.aggregations,
      };
    case ADD_SALE:
      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload);
      return { ...state, list };

    case SALE_DETAILS:
      return { ...state, sale: action.payload.data };

    case DELETE_SALE:
      const filterSale = state.list.filter(
        (sale) => sale.id !== parseInt(action.payload) && sale
      );
      return { ...state, list: filterSale };

    // return {
    //   list: [
    //     ...state.list.filter((sup) => sup.id !== parseInt(action.payload)),
    //   ],
    // };

    case ADD_SALE_ERROR:
      message.error(action.payload);
      return state;
    default:
      return state;
  }
};

export default saleReducer;
