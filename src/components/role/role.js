import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddRole from "./AddRole";

const RoleList = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return (
    <div>
      <PageTitle title="Back" />
      <AddRole />
    </div>
  );
};

export default RoleList;
