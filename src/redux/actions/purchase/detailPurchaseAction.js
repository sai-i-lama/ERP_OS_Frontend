import { PURCHASE_DETAILS } from "../../types/PurchaseType";
import axios from "axios";

const detailPurchaseAction = (data) => {
  return {
    type: PURCHASE_DETAILS,
    payload: data,
  };
};

export const loadSinglePurchase = (id) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const data = await axios.get(`purchase-invoice/${id}`);
      //dispatching data
      dispatch(detailPurchaseAction(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
