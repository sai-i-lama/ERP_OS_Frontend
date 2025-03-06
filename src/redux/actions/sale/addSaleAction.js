import { ADD_SALE } from "../../types/SaleType";
import axios from "axios";

const addPurchaseAciton = (data) => {
  return {
    type: ADD_SALE,
    payload: data
  };
};


export const addSale = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        url: `sale-invoice/`,
        data: {
          ...values
        }
      });

      // dispatching data
      const newData = {
        ...data.createdInvoice,
        customer: data.customer
      };

      dispatch(addPurchaseAciton(newData));
      return {
        createdInvoiceId: data.createdInvoice.id,
        message: "success"
      };
    } catch (error) {
      if (error.response) {
        console.error("Erreur de réponse du serveur:", error.response.data);
        console.error("Statut:", error.response.status);
        console.error("En-têtes:", error.response.headers);
      } else if (error.request) {
        console.error("Erreur de requête:", error.request);
      } else {
        console.error("Erreur:", error.message);
      }
      return {
        message: "error"
      };
    }
  };
};
