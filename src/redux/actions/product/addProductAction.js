import { ADD_PRODUCT } from "../../types/ProductType";

import axios from "axios";
import { toast } from "react-toastify";

const addProducAction = (data) => {
  return {
    type: ADD_PRODUCT,
    payload: data,
  };
};

export const addProduct = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        url: `product/`,
        data: values,
      });
      //dispatching data
      dispatch(addProducAction(data));
      toast.success("Product Added ");
      return {
        message: "success",
      };
    } catch (error) {
      console.log(error.message);
      toast.error("Error, Check Name and Others ");
      return {
        message: "error",
      };
    }
  };
};
