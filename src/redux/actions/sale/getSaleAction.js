import { SALES } from "../../types/SaleType";

import axios from "axios";
import { toast } from "react-toastify";

const getSaleAction = (data) => {
	return {
		type: SALES,
		payload: data,
	};
};

export const loadAllSale = ({ page, limit, startdate, enddate, user }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`sale-invoice?&page=${page}&count=${limit}&startdate=${startdate}&enddate=${enddate}&user=${user}`
			);

			//dispatching data
			dispatch(getSaleAction(data));
			return {
				message: "success",
			};
		} catch (error) {
			console.log(error.message);
			toast.error("Error in loading sales");
		}
	};
};
