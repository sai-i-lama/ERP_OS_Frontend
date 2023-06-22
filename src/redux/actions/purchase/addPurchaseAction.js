import { ADD_PURCHASE } from "../../types/PurchaseType";
import axios from "axios";
import { toast } from "react-toastify";

const addPurchaseAciton = (data) => {
  return {
    type: ADD_PURCHASE,
    payload: data,
  };
};

export const addPurchase = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `purchase-invoice/`,
        data: {
          ...values,
        },
      });
      //dispatching data

      const newData = {
        ...data.createdInvoice,
        supplier: data.supplier,
      };

      dispatch(addPurchaseAciton(newData));
      toast.success("New Product Purchased ");
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
