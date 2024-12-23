import { SALE_DETAILS } from "../../types/SaleType";
import axios from "axios";

const detailSaleAction = (data) => {
  return {
    type: SALE_DETAILS,
    payload: data,
  };
};

export const loadSingleSale = (id) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const data = await axios.get(`sale-invoice/${id}`);
      //dispatching data
      dispatch(detailSaleAction(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
