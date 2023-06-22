import { CUSTOMER_DETAILS } from "../../types/CustomerType";
import axios from "axios";

const detailCustomer = (data) => {
  return {
    type: CUSTOMER_DETAILS,
    payload: data,
  };
};

export const loadSingleCustomer = (id) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const data = await axios.get(`customer/${id}`);
      //dispatching data
      dispatch(detailCustomer(data));
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
};
