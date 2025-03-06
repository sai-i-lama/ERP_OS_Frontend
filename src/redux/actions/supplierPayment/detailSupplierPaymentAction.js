import { SUPPLIER_DETAILS_PAYMENT } from "../../types/SupplierPaymentType";
import axios from "axios";

const detailSupplierPaymentAction = (data) => {
  return {
    type: SUPPLIER_DETAILS_PAYMENT,
    payload: data,
  };
};

export const loadSupplierSinglePayment = (id) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const data = await axios.get(`transaction/${id}`);
      //dispatching data
      dispatch(detailSupplierPaymentAction(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
