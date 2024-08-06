import axios from "axios";
import { toast } from "react-toastify";
import { LOGIN_USER } from "../../types/UserType";

const addUserAction = (data) => {
  return {
    type: LOGIN_USER,
    payload: data
  };
};

export const addUser = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        url: `user/login`,
        data: {
          ...values
        }
      });
      //dispatching data
      dispatch(addUserAction(data));
      localStorage.setItem("access-token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user", data.username);
      localStorage.setItem("id", data.id);
      localStorage.setItem("isLogged", true);
      toast.success("Connexion effectuée avec succès");

      return "success";
    } catch (error) {
      console.log(error.message);
      toast.error("Nom d'utilisateur ou mot de passe incorrect !");
      return "error";
    }
  };
};
