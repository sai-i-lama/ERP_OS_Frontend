import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddProductCategory from "./addProductCategory";
import GetAllProductCategory from "./getAllProductCategory";

const ProductCategory = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Back" />

      <AddProductCategory />

      <GetAllProductCategory />
    </div>
  );
};

export default ProductCategory;
