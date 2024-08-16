import { SALES } from "../../types/SaleType";

import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const getSaleAction = (data) => {
  return {
    type: SALES,
    payload: data
  };
};

export const loadAllSale = ({
  page,
  limit,
  startdate,
  enddate,
  user,
  count
}) => {
  return async (dispatch) => {
    try {
      const formattedStartDate = moment(startdate).toISOString();
      const formattedEndDate = moment(enddate).toISOString();

      const queryString = new URLSearchParams({
        page,
        limit,
        startdate: formattedStartDate,
        enddate: formattedEndDate,
        user,
        count
      }).toString();

      const { data } = await axios.get(`sale-invoice?${queryString}`);
      dispatch(getSaleAction(data));
      return { message: "success" };
    } catch (error) {
      console.log(error.message);
      toast.error("Erreur de chargement des ventes");
    }
  };
};
