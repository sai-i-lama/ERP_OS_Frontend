import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddCust from "./addCust";
import GetAllCust from "./getAllCust";

const Customer = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Back" />
      <AddCust />
      <GetAllCust />
    </div>
  );
};

export default Customer;
