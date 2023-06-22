import axios from "axios";
import { toast } from "react-toastify";

export const addReturnPurchase = async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `return-purchase-invoice/`,
			data: {
				...values,
			},
		});
		toast.success("Return Purchase Added Successfully");
		return "success";
	} catch (error) {
		toast.error("Something went wrong at Return Purchase ");
		console.log(error.message);
	}
};
