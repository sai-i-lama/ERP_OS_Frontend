import { ADD_SUPPLIER } from "../.././types/SuppliersType";
import axios from "axios";
import { toast } from "react-toastify";

const addSupplieraction = (data) => {
	return {
		type: ADD_SUPPLIER,
		payload: data,
	};
};

export const addSupplier = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `supplier/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addSupplieraction(data));
			toast.success("Supplier Added");
			return {
				message: "success",
			};
		} catch (error) {
			console.log(error.message);
			toast.error("Error : Supplier already exists");
		}
	};
};
