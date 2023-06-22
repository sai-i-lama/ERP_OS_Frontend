import { ADD_SALE } from "../../types/SaleType";
import axios from "axios";
import { toast } from "react-toastify";

const addPurchaseAciton = (data) => {
  return {
    type: ADD_SALE,
    payload: data,
  };
};

export const addSale = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `sale-invoice/`,
        data: {
          ...values,
        },
      });
      //dispatching data

      const newData = {
        ...data.createdInvoice,
        customer: data.customer,
      };

      dispatch(addPurchaseAciton(newData));
      toast.success("New Product Sold ");
      return {
        createdInvoiceId: data.createdInvoice.id,
        message: "success",
      };
    } catch (error) {
      console.log(error.message);
      return {
        message: "error",
      };
    }
  };
};
