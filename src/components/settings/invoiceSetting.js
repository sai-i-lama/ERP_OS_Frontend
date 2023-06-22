import PageTitle from "../page-header/PageHeader";

import { Navigate } from "react-router-dom";
import AddDetails from "./addDetails";

const InvoiceSetting = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title="Back" />

      <AddDetails />
    </>
  );
};

export default InvoiceSetting;
