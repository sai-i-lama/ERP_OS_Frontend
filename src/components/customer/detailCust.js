import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover, Typography } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCustomer } from "../../redux/actions/customer/deleteCustomerAction";
import { loadSingleCustomer } from "../../redux/actions/customer/detailCustomerAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import CustomerInvoiceList from "../Card/CustomerInvoiceList";

//PopUp

const DetailCust = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customers.customer);

  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(deleteCustomer(id));
      setVisible(false);
      toast.warning(`Client : ${customer.username} est supprimé `);
      return navigate("/customer");
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
    dispatch(loadSingleCustomer(id));
  }, [id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Retour " subtitle={`CLIENT ${customer?.username} `} />

      <div className="mr-top">
        {customer ? (
          <Fragment key={customer?.id}>
            <Card bordered={false} style={{}}>
              <div className="card-header d-flex justify-content-between m-3">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">
                    ID : {customer.id} | {customer.username}
                  </span>
                </h5>
                <div className="text-end">
                  <Link
                    className="m-2"
                    to={`/customer/${customer.id}/update`}
                    state={{ data: customer }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}
                    >Modifier</Button>
                  </Link>
                  <Popover
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Oui !
                        </Button>
                      </a>
                    }
                    title="Voulez-vous vraiment supprimer ?"
                    trigger="click"
                   open={visible}
                    onOpenChange={handleVisibleChange}
                  >
                    <Button
                      type="danger"
                      data-detailcust={true}
                      shape="round"
                      icon={<DeleteOutlined />}
                    >Supprimer</Button>
                  </Popover>
                </div>
              </div>
              <div className="card-body m-2">
                <p>
                  <Typography.Text strong>Numero de telephone :</Typography.Text>{" "}
                  {customer.phone}
                </p>

                <p>
                  <Typography.Text strong>Adresse :</Typography.Text>{" "}
                  {customer.address}
                </p>

                <p>
                  <Typography.Text strong>Montant à payer :</Typography.Text>{" "}
                  {customer.due_amount}
                </p>
              </div>
              <CustomerInvoiceList
                list={customer?.saleInvoice}
                key={customer?.saleInvoice?.id}
                linkTo="/sale"
              />
              {/* <CustomerReturnInvoiceList
                list={customer?.allReturnSaleInvoice}
              />
              <CustomerTransactionList list={customer?.allTransaction} /> */}
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailCust;
