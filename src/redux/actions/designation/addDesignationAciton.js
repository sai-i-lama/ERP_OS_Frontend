import { ADD_DESIGNATION } from "../../types/DesignationType";
import axios from "axios";
import { toast } from "react-toastify";

const addDesignationAction = (data) => {
	return {
		type: ADD_DESIGNATION,
		payload: data,
	};
};

export const addDesignation = (values) => {
	return async (dispatch) => {
		try {
			const { data } = await axios({
				method: "post",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url: `designation/`,
				data: {
					...values,
				},
			});
			//dispatching data
			dispatch(addDesignationAction(data));
			toast.success("Fonction ajoutée");
			return "success";
		} catch (error) {
			toast.error("Erreur lors de l'ajout de la fonction, essayez à nouveau");
			console.log(error.message);
			return "error";
		}
	};
};
