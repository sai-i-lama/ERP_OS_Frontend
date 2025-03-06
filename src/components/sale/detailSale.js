import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Popover, Row, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardComponent from "../Card/card.components";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { loadSingleSale } from "../../redux/actions/sale/detailSaleAction";

import { deleteSale } from "../../redux/actions/sale/deleteSaleAction";
import ReturnSaleInvoiceList from "../Card/saleInvoice/ReturnSaleInvoiceList";
import SaleProductListCard from "../Card/saleInvoice/SaleProductListCard";
import TransactionSaleList from "../Card/saleInvoice/TransactionSaleList";
import PackingSlip from "../Invoice/PackingSlip";
import PosPrint from "../Invoice/PosPrint";
import SaleInvoice from "../Invoice/SaleInvoice";
import moment from "moment";
import "./sale.css";
import { cancelSale } from "../../redux/actions/sale/cancelSaleAction";
//PopUp

const DetailSale = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(null);

  //dispatch
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.sales.sale);

  console.log(sale);

  //Delete Customer
  // const onDelete = () => {
  // 	try {
  // 		dispatch(deleteSale(id));
  // 		setVisible(false);
  // 		toast.warning(`La commande : ${sale.id} a étée livrée`);
  // 		return navigate("/salelist");
  // 	} catch (error) {
  // 		console.log(error.message);
  // 	}
  // };

  // const { rellvalue, amount } = useSelector((state) => state.sales);


  const handleCancel = () => {
    try {
      dispatch(cancelSale(id));
      toast.success(`Votre commande a été annulée`);
      return navigate("/salelist");
    } catch (error) {
      toast.error(`Erreur lors de la mise à jour de la commande`);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleUpdate = async (field, value) => {
    setLoading(true);
    try {
      await dispatch(deleteSale(id, { [field]: value }));
      toast.success(`L'opération a réussi avec succès`);
      navigate("/salelist");
    } catch (error) {
      toast.error(`Erreur lors de la mise à jour de la commande`);
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  const handleVisibleChange = (popover) => (newVisible) => {
    setVisiblePopover(newVisible ? popover : null);
  };

  // const rellvalue = localStorage.getItem("rellvalue");
  // const amount = localStorage.getItem("amount");
  const { discount } = useSelector((state) => state.sales);


  const {
    status,
    totalPaidAmount,
    totalReturnAmount,
    dueAmount,
    singleSaleInvoice,
    returnSaleInvoice,
    transactions,
    totalUnitMeasurement,
    amount,
   
  } = sale ? sale : {};


  // Delete Customer PopUp
  const [visible, setVisible] = useState(false);
  //const rellvalue = singleSaleInvoice.due_amount - singleSaleInvoice.discount;
  //  const refund = amount - rellvalue;

  useEffect(() => {
    dispatch(loadSingleSale(id));
  }, [id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  const role = localStorage.getItem("role");

  const isProfessional = role === "Professionnel";
  const isParticulier = role === "Particulier";

  const isProRole = isProfessional
    ? "Professionnel"
    : isParticulier
    ? "Particulier"
    : null;

    if (status === "PAYÉ") {
      singleSaleInvoice.paid_amount = singleSaleInvoice.due_amount - singleSaleInvoice.discount;;
      singleSaleInvoice.due_amount = 0
    }

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle
        title="Retour"
        subtitle={`${singleSaleInvoice?.numCommande}`}
      />

      <div className="mr-top">
        {singleSaleInvoice ? (
          <Fragment key={singleSaleInvoice.id}>
            <Card bordered={false} className="card-custom">
              <h5 className="m-2">
                <i className="bi bi-person-lines-fill"></i>
                <span className="mr-left">
                  Commande N° : <b>{singleSaleInvoice.numCommande}</b> |
                </span>
              </h5>
              <div className="card-header d-flex justify-content-end custom-gap">
                {!isProRole && (
                  <div className="d-flex gap-5">
                    <Popover
                      content={
                        <a
                          onClick={() => handleUpdate("delivred", true)}
                          disabled={loading}
                        >
                          <Button type="primary">Oui</Button>
                        </a>
                      }
                      title="Voulez-vous vraiment Confirmer la livraison de cette commande ?"
                      trigger="click"
                      open={visiblePopover === "delivred"}
                      onOpenChange={handleVisibleChange("delivred")}
                    >
                      <Button shape="round" className={"bg-success text-dark"}>
                        Confirmer la livraison
                      </Button>
                    </Popover>

                    <Popover
                      content={
                        <a
                          onClick={() => handleUpdate("ready", true)}
                          disabled={loading}
                        >
                          <Button type="primary">Oui</Button>
                        </a>
                      }
                      title="Voulez-vous vraiment Marquer cette commande comme prête ?"
                      trigger="click"
                      open={visiblePopover === "ready"}
                      onOpenChange={handleVisibleChange("ready")}
                    >
                      <Button shape="round" className={"bg-success text-dark"}>
                        Marquer comme prête
                      </Button>
                    </Popover>

                    <Button type="primary" shape="round">
                      <Link to={`/payment/customer/${id}`}>Paiement</Link>
                    </Button>
                  </div>
                )}
                <Popover
                  content={
                    <a onClick={() => handleCancel()} disabled={loading}>
                      <Button type="primary">Oui</Button>
                    </a>
                  }
                  title="Voulez-vous vraiment Annuler cette commande ?"
                  trigger="click"
                  open={visiblePopover === "cancel"}
                  onOpenChange={handleVisibleChange("cancel")}
                >
                  <Button shape="round" className={"bg-danger text-dark"}>
                    Annuler la commande
                  </Button>
                </Popover>
                <div className={""}>
                  <SaleInvoice data={singleSaleInvoice} />
                </div>
                {/* <div className={""}>
                  <PackingSlip data={singleSaleInvoice} />
                </div> */}
              </div>
              <div className="card-body">
                <Row justify="start">
                  <Col span={12}>
                    <Badge.Ribbon
                      text={status}
                      color={status === "PAYÉ" ? "green" : "red"}
                    >
                      <CardComponent title="Informations sur la commande ">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>
                              <Typography.Text strong>
                                Date de vente :
                              </Typography.Text>{" "}
                              <strong>
                                {moment(singleSaleInvoice.date).format(
                                  "DD/MM/YY HH:mm"
                                )}
                              </strong>
                            </p>
                            <p>
                              <Typography.Text strong>
                                Client :{" "}
                              </Typography.Text>{" "}
                              <Link
                                to={`/customer/${singleSaleInvoice.customer.id}`}
                              >
                                <strong>
                                  {singleSaleInvoice.customer.username}
                                </strong>
                              </Link>
                            </p>

                            <p>
                              <Typography.Text strong>
                                Type de client :{" "}
                              </Typography.Text>{" "}
                              <strong>{singleSaleInvoice.customer.role}</strong>
                            </p>

                            <p>
                              <Typography.Text strong>
                                Montant total :
                              </Typography.Text>{" "}
                              <strong>{singleSaleInvoice.total_amount}</strong>
                            </p>
                           
                            <p>
                              <Typography.Text strong>
                                Montant payé :
                              </Typography.Text>{" "}
                               
                             <strong>{singleSaleInvoice.paid_amount}</strong>
                             
                            </p>
                            
                            <p>
                              <Typography.Text strong>
                                Montant à payer :
                              </Typography.Text>{" "}
                              <strong className={"text-danger"}>
                                {" "}
                                {singleSaleInvoice.due_amount}
                              </strong>
                            </p>
                          </div>
                          <div>
                            {!isProRole && (
                              <div>
                                <p>
                                  <Typography.Text strong>
                                    Remise :
                                  </Typography.Text>{" "}
                                  <strong>{singleSaleInvoice.discount}</strong>
                                </p>
                                <p>
                                  <Typography.Text strong>
                                    Bénéfice :
                                  </Typography.Text>{" "}
                                  <strong>{singleSaleInvoice.profit}</strong>
                                </p>
                              </div>
                            )}
                            <p>
                              <Typography.Text strong>Prête :</Typography.Text>{" "}
                              <strong
                                className={`${
                                  singleSaleInvoice.ready
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                                style={{
                                  display: "inline-block",
                                  width: "50px",
                                  height: "25px",
                                  textAlign: "center",
                                  lineHeight: "25px"
                                }}
                              >
                                {singleSaleInvoice.ready ? "Oui" : "Non"}
                              </strong>
                            </p>
                            <p>
                              <Typography.Text strong>Livrée :</Typography.Text>{" "}
                              <strong
                                className={`${
                                  singleSaleInvoice.delivred
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                                style={{
                                  display: "inline-block",
                                  width: "50px",
                                  height: "25px",
                                  textAlign: "center",
                                  lineHeight: "25px"
                                }}
                              >
                                {singleSaleInvoice.delivred ? "Oui" : "Non"}
                              </strong>
                            </p>
                            <p>
                              <Typography.Text strong>
                                Montant donné :
                              </Typography.Text>{" "}
                              <strong>{singleSaleInvoice.given_amount || amount}</strong>
                            </p>
                            <p>
                              <Typography.Text strong>
                                Montant remboursé :
                              </Typography.Text>{" "}
                              <strong>
                                {singleSaleInvoice.amount_refunded || dueAmount}
                              </strong>
                            </p>
                          </div>
                          <div className="me-2"></div>
                        </div>
                      </CardComponent>
                    </Badge.Ribbon>
                  </Col>
                  <Col span={6}></Col>
                </Row>
                <br />
              </div>
            </Card>
            <SaleProductListCard list={singleSaleInvoice.saleInvoiceProduct} />

            {/* <ReturnSaleInvoiceList list={returnSaleInvoice} /> */}

            {/* <TransactionSaleList list={transactions} /> */}
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailSale;
