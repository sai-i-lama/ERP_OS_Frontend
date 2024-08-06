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
//PopUp

const DetailSaleMat = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(null);

  //dispatch
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.sales.sale);

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

  const handleUpdate = async (field, value) => {
    setLoading(true);
    try {
      await dispatch(deleteSale(id, { [field]: value }));
      toast.success(`L'opération a réussi avec succès`);
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

  const {
    status,
    totalPaidAmount,
    totalReturnAmount,
    dueAmount,
    singleSaleInvoice,
    returnSaleInvoice,
    transactions,
    totalUnitMeasurement
  } = sale ? sale : {};
  // Delete Customer PopUp
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(loadSingleSale(id));
  }, [id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const role = localStorage.getItem("role");
  const isProRole = role === "Professionnel";

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Retour" />

      <div className="mr-top">
        {singleSaleInvoice ? (
          <Fragment key={singleSaleInvoice.id}>
            <Card bordered={false} className="card-custom">
              <h5 className="m-2">
                <i className="bi bi-person-lines-fill"></i>
                <span className="mr-left">Identifiant : <b>{singleSaleInvoice.numCommande}</b> |</span>
              </h5>
              <div className="card-header d-flex justify-content-end custom-gap">
                {!isProRole && (
                  <div className="d-flex gap-3">
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
                      <button className="btn bg-success">
                        Confirmer la livraison
                      </button>
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
                      <button className="btn bg-warning">
                        Marquer comme prête
                      </button>
                    </Popover>
                  </div>
                )}
                <div className={""}>
                  <SaleInvoice data={singleSaleInvoice} />
                </div>
                <div className={""}>
                  <PackingSlip data={singleSaleInvoice} />
                </div>
              </div>
              <div className="card-body">
                <Row justify="space-around">
                  <Col span={11}>
                    <CardComponent title="Informations sur la facture initiale ">
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
                            <Typography.Text strong>Client : </Typography.Text>{" "}
                            <Link
                              to={`/customer/${singleSaleInvoice.customer.id}`}
                            >
                              <strong>{singleSaleInvoice.customer.name}</strong>
                            </Link>
                          </p>

                          <p>
                            <Typography.Text strong>
                              Type de client :{" "}
                            </Typography.Text>{" "}
                            <strong>
                              {singleSaleInvoice.customer.type_customer}
                            </strong>
                          </p>

                          <p>
                            <Typography.Text strong>
                              Montant total :
                            </Typography.Text>{" "}
                            <strong>{singleSaleInvoice.total_amount}</strong>
                          </p>
                          <p>
                            <Typography.Text strong>Remise :</Typography.Text>{" "}
                            <strong>{singleSaleInvoice.discount}</strong>
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
                            <strong style={{ color: "red" }}>
                              {" "}
                              {singleSaleInvoice.due_amount}
                            </strong>
                          </p>
                          <p>
                            <Typography.Text strong>Bénéfice :</Typography.Text>{" "}
                            <strong>{singleSaleInvoice.profit}</strong>
                          </p>
                        </div>

                        <div className="me-2"></div>
                      </div>
                    </CardComponent>
                  </Col>
                  <Col span={12}>
                    <Badge.Ribbon
                      text={status}
                      color={status === "PAYÉ" ? "green" : "red"}
                    >
                      <CardComponent title="Mise à jour des informations sur la facture ">
                        <div>
                          <p>
                            <Typography.Text strong>
                              Montant total payé :
                            </Typography.Text>{" "}
                            <strong>{totalPaidAmount}</strong>
                          </p>

                          <p>
                            <Typography.Text strong>
                              Montant total du retour:
                            </Typography.Text>{" "}
                            <strong>{totalReturnAmount}</strong>
                          </p>

                          <p>
                            <Typography.Text strong>
                              Montant à payer :
                            </Typography.Text>{" "}
                            <strong style={{ color: "red" }}>
                              {dueAmount}
                            </strong>
                          </p>
                          {/* <p>
														<Typography.Text strong>
															Total Unit Messurement :
														</Typography.Text>{" "}
														<strong>{totalUnitMeasurement}</strong>
													</p> */}
                        </div>
                      </CardComponent>
                    </Badge.Ribbon>
                  </Col>
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

export default DetailSaleMat;
