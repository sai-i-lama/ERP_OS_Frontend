import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddUser from "./addUser";
import GetAllUser from "./GetAllUser";

const UserList = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return (
    <div>
      <PageTitle title="Back" />
      <AddUser />
      <GetAllUser />
    </div>
  );
};

export default UserList;
