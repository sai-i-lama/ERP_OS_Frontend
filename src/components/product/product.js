import PageTitle from "../page-header/PageHeader";
import GetAllProd from "./getAllProd";

import { Navigate } from "react-router-dom";
import AddProd from "./addProd";

const Product = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title="Back" />

      <AddProd />

      <GetAllProd />
    </>
  );
};

export default Product;
