import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddDesignation from "./addDesignation";
import GetAllDesignation from "./getAllDesignation";

const Designation = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Back" />
      <AddDesignation />
      <GetAllDesignation />
    </div>
  );
};

export default Designation;
