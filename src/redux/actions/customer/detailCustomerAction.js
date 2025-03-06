import { CUSTOMER_DETAILS } from "../../types/CustomerType";
import axios from "axios";

const detailCustomer = (data) => {
  return {
    type: CUSTOMER_DETAILS,
    payload: data
  };
};

export const loadSingleCustomer = (id, startdate, enddate) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const data = await axios.get(
        `customer/${id}${
          startdate || enddate
            ? `?startdate=${encodeURIComponent(
                startdate
              )}&enddate=${encodeURIComponent(enddate)}`
            : ""
        }`
      );
      //dispatching data
      dispatch(detailCustomer(data));
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
};
