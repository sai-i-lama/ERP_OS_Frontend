import { SUPPLIERS_PAYMENT } from "../../types/SupplierPaymentType";
import axios from "axios";

const getSuppliersPayment = (data) => {
	return {
		type: SUPPLIERS_PAYMENT,
		payload: data,
	};
};

export const loadSupplierAllPayment = ({
	page,
	limit,
	startdate,
	enddate,
	status = true,
}) => {
	//dispatching with an call back function and returning that
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`transaction?status=${status}&page=${page}&count=${limit}&startdate=${startdate}&enddate=${enddate}`
			);
			//dispatching data
			dispatch(getSuppliersPayment(data));
		} catch (error) {
			console.log(error.message);
		}
	};
};
