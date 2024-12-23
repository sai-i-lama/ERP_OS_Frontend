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
		toast.success("La vente a été ajoutée avec succès");
		return "success";
	} catch (error) {
		toast.error("Quelque chose s’est mal passé lors de l'affichage de la vente ");
		console.log(error.message);
	}
};
