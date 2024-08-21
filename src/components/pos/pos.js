import PageTitle from "../page-header/PageHeader";
import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AddPos from "./AddPos";
import ProductsForSale from "./ProductsForSale";
import ReadyCommandeNotification from "../notification/ReadyCommandeNotification";

const Sale = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const [selectedProds, setSelectedProds] = useState([]);
  const [dueClientList, SetdueClientList] = useState([]);

  const userRole = localStorage.getItem("role");

  const isProfessional = userRole === "Professionnel";
  const isParticulier = userRole === "Particulier";

  const isProRole = isProfessional
    ? "Professionnel"
    : isParticulier
    ? "Particulier"
    : null;
  const user_id = localStorage.getItem("id");

  const handleSelectedProds = (prod) => {
    const foundProd = selectedProds.find((item) => item.id === prod.id);
    if (foundProd === undefined) {
      setSelectedProds((prev) => [...prev, { ...prod, selectedQty: 1 }]);
    }
  };

  const handleSelectedProdsQty = (prodId, qty) => {
    const updatedSelectedProds = selectedProds.map((prod) => {
      let prodCopy;
      if (prod.id === prodId) {
        prodCopy = { ...prod, selectedQty: qty };
      } else prodCopy = { ...prod };

      return prodCopy;
    });

    setSelectedProds(updatedSelectedProds);
  };

  const handleSelectedProdsUnitPrice = (prodId, unitPrice) => {
    const updatedSelectedProds = selectedProds.map((prod) => {
      let prodCopy;
      if (prod.id === prodId) {
        prodCopy = { ...prod, sale_price: unitPrice };
      } else prodCopy = { ...prod };

      return prodCopy;
    });

    setSelectedProds(updatedSelectedProds);
  };

  const handleDeleteProd = (prodId) => {
    const updatedProd = selectedProds.filter((prod) => prod.id !== prodId);
    setSelectedProds(updatedProd);
  };

  // const filteredList = dueClientList?.filter(
  //   (item) => item.customer.username === user_id
  // );

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Retour" subtitle="BOUTIQUE" />
      <Row gutter={[20]}>
        <div
          className="col-md-12"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1%"
          }}
        >
          {isProRole && <ReadyCommandeNotification customerId={user_id} />}
        </div>
        <Col span={24} lg={13} xl={14}>
          <ProductsForSale handleSelectedProds={handleSelectedProds} />
        </Col>
        <Col span={24} lg={11} xl={10}>
          <AddPos
            selectedProds={selectedProds}
            handleSelectedProdsQty={handleSelectedProdsQty}
            handleSelectedProdsUnitPrice={handleSelectedProdsUnitPrice}
            handleDeleteProd={handleDeleteProd}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Sale;
