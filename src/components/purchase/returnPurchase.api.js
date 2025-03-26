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
		toast.success("Retour d'achat ajouté avec succès");
		return "success";
	} catch (error) {
		toast.error("Quelque chose n'a pas fonctionné lors de l'achat en retour ");
		console.log(error.message);
	}
};
