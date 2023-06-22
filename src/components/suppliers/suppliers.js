import React, { createContext } from "react";
import PageTitle from "../page-header/PageHeader";
import AddSup from "./addSup";
import GetAllSup from "./getAllSup";

import { Navigate } from "react-router-dom";

export const SuppliersContext = createContext();

const Suppliers = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return (
    <>
      <PageTitle title="Back" />
      <AddSup />
      <GetAllSup />
    </>
  );
};

export default Suppliers;
