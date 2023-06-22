import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const checkTokenExp = (token) => {
  //   console.log(token);
  try {
    if (jwtDecode(token).exp * 1000 < Date.now()) {
      console.log("Time Expired");
      return (window.location.href = "/auth/logout");
    } else {
      //   console.log(
      //     "Token has time",
      //     jwtDecode(token).exp * 1000,
      //     "&",
      //     Date.now(),
      //   );
    }
  } catch (error) {
    console.log("error");
    return (window.location.href = "/auth/logout");
  }
};

export default checkTokenExp;
