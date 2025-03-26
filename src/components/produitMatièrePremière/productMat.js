import PageTitle from "../page-header/PageHeader";
// import GetAllProd from "./getAllProd";

import { Navigate } from "react-router-dom";
import AddProdMat from "./addProdMat";

const ProductMat = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title="Retour" subtitle={"MATIÈRE PREMIÈRE"}/>

      <AddProdMat />

      {/* <GetAllProd /> */}
    </>
  );
};

export default ProductMat;
