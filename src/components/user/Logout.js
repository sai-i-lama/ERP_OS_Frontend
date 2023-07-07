import { useEffect } from "react";
import { toast } from "react-toastify";

function Logout(props) {
  useEffect(() => {
    localStorage.clear();
    // deleteAllCookies();
    toast.success("Déconnecté");
    // localStorage.setItem("isLogged", false);;

    localStorage.setItem("isLogged", "");
    window.location.href = "/auth/login";
  }, []);
}
export default Logout;
