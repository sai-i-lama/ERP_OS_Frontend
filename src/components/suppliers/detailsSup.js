import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteSupplier } from "../../redux/actions/supplier/deleteSupplierAction";
import { loadSupplier } from "../../redux/actions/supplier/detailSupplierAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import "./suppliers.css";

import { CSVLink } from "react-csv";
import SupplierInvoiceTable from "../Card/SupplierInvoiceList";
// import SupplierReturnInvoiceList from "./ListCard/SupplierReturnInvoiceList";
// import SupplierTransactionList from "./ListCard/SupplierTransactionList";

//PopUp

const DetailsSup = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const supplier = useSelector((state) => state.suppliers.supplier);

  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(deleteSupplier(id));

      setVisible(false);
      toast.warning(`Fournisseur : ${supplier.name} est supprimé `);
      return navigate("/supplier");
    } catch (error) {
      console.log(error.message);
    }
  };
  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    dispatch(loadSupplier(id));
  }, [dispatch, id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Retour " subtitle={`Information sur le Fournisseur ${supplier?.name} `} />

      <div className="mr-top">
        {supplier ? (
          <Fragment key={supplier.name}>
            <Card bordered={false} style={{}}>
              <div className="card-header d-flex justify-content-between" style={{ padding: 0 }}>
                <div className="w-50">
                  <h5>
                    <i className="bi bi-person-lines-fill"></i>
                    <span className="mr-left">
                      ID : {supplier.id} | {supplier.name}
                    </span>
                  </h5>
                </div>
                <div className="text-end w-50 gap">
                  <Link
                    className="me-3 d-inline-block"
                    to={`/supplier/${supplier.id}/update`}
                    state={{ data: supplier }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}
                    >Renommer</Button>
                  </Link>
                  <Popover
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Oui !
                        </Button>
                      </a>
                    }
                    title="Êtes-vous sûr de vouloir supprimer ?"
                    trigger="click"
                    open={visible}
                    onOpenChange={handleVisibleChange}
                  >
                    <Button
                      type="danger"
                      shape="round"
                      icon={<DeleteOutlined />}
                    >Supprimer</Button>
                  </Popover>
                </div>
              </div>
              <div className="mt-3 mb-3">
                <p>
                  <Typography.Text className="font-semibold">
                    Numero de telephone : {supplier.phone}
                  </Typography.Text>{" "}
                </p>

                <p>
                  <Typography.Text className="font-semibold">
                    Adresse :
                  </Typography.Text>{" "}
                  {supplier.address}
                </p>

                <p>
                  <Typography.Text strong>Montant à payer :</Typography.Text>{" "}
                  {supplier.due_amount}
                </p>
              </div>
              <hr />
              <h6 className="font-semibold m-0 text-center">
              Toutes les informations sur la facture
              </h6>
              <div className="text-center m-2 d-flex justify-content-end">
                {supplier.purchaseInvoice && (
                  <div>
                    <CSVLink
                      data={supplier.purchaseInvoice}
                      className="btn btn-dark btn-sm mb-1"
                      filename="suppliers"
                      style={{ margin: "5px" }}
                    >
                      Télécharger .CSV
                    </CSVLink>
                  </div>
                )}
              </div>
              <SupplierInvoiceTable
                list={supplier.purchaseInvoice}
                linkTo="/purchase"
              />
              {/* <SupplierReturnInvoiceList
                list={supplier?.allReturnPurchaseInvoice}
              />
              <SupplierTransactionList list={supplier?.allTransaction} /> */}
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsSup;
