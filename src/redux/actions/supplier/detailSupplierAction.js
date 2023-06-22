import { SUPPLIER_DETAILS } from "../../types/SuppliersType";
import axios from "axios";

const detailSuppliers = (data) => {
  return {
    type: SUPPLIER_DETAILS,
    payload: data,
  };
};

export const loadSupplier = (id) => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const data = await axios.get(`supplier/${id}`);
      //dispatching data
      dispatch(detailSuppliers(data));
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
};
