import { PURCHASES } from "../../types/PurchaseType";

import axios from "axios";

const getPurchaseAction = (data) => {
	return {
		type: PURCHASES,
		payload: data,
	};
};

export const loadAllPurchase = ({ page, limit, startdate, enddate }) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`purchase-invoice?&page=${page}&count=${limit}&startdate=${startdate}&enddate=${enddate}`
			);
			//dispatching data
			dispatch(getPurchaseAction(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
