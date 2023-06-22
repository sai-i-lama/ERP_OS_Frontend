import axios from "axios";
import { toast } from "react-toastify";

export const addReturnSale = async (values) => {
	try {
		const { data } = await axios({
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `return-sale-invoice/`,
			data: {
				...values,
			},
		});
		toast.success("Return Sale Added Successfully");
		return "success";
	} catch (error) {
		toast.error("Something went wrong at Return Sale ");
		console.log(error.message);
	}
};
