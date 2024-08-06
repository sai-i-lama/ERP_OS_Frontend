import { SALES } from "../../types/SaleType";

import axios from "axios";
import { toast } from "react-toastify";

const getSaleAction = (data) => {
	return {
		type: SALES,
		payload: data,
	};
};

export const loadAllSale = ({ page, limit, startdate, enddate, user, count }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const queryString = new URLSearchParams({ page, limit, startdate, enddate, user, count }).toString();
			const { data } = await axios.get(
				`sale-invoice?${queryString}`
			);

			//dispatching data
			dispatch(getSaleAction(data));
			return {
				message: "success",
			};
		} catch (error) {
			console.log(error.message);
			toast.error("Erreur de chargement des ventes");
		}
	};
};
