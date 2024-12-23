import PageTitle from "../page-header/PageHeader";

import { Navigate } from "react-router-dom";
import GetAllTransaction from "./getAllTransaction";

const Transaction = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Retour" subtitle={"TRANSACTION"}/>
      <br />
      <GetAllTransaction />
    </div>
  );
};

export default Transaction;
