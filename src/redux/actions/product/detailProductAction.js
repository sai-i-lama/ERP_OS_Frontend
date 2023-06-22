import { PRODUCT_DETAILS } from "../../types/ProductType";

import axios from "axios";

const detailProductAction = (data) => {
  return {
    type: PRODUCT_DETAILS,
    payload: data,
  };
};

export const loadSingleProduct = (id) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const data = await axios.get(`product/${id}`);
      //dispatching data
      dispatch(detailProductAction(data));
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
};
