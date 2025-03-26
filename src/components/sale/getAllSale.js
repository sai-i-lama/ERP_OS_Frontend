import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Navigate } from "react-router-dom";
import "./sale.css";

import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Menu,
  Segmented,
  Select,
  Table
} from "antd";
import moment from "moment";
import { useEffect, useState, Fragment } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";
import DashboardCard from "../Card/DashboardCard";
import SaleReportPrint from "../Invoice/SaleReport";
import PageTitle from "../page-header/PageHeader";
import DueClientNotification from "../notification/DueClientNotification";
import CustomerInvoiceList from "../Card/CustomerInvoiceList";
import { loadSingleCustomer } from "../../redux/actions/customer/detailCustomerAction";
import DashboardCardByCus from "../Card/DashboardCardByCus";

// //Date fucntinalities
// let startdate = moment(new Date()).format("YYYY-MM-DD HH:mm");
// let enddate = moment(new Date()).add(1, "day").format("YYYY-MM-DD HH:mm");

function CustomTable({ list, total, startdate, enddate, count, user }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const dispatch = useDispatch();

  const loggedInUser = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const isProfessional = role === "Professionnel";
  const isParticulier = role === "Particulier";



  const currentRole = isProfessional
    ? "Professionnel"
    : isParticulier
    ? "Particulier"
    : null;

  const columns = [
    {
      title: "N° facture",
      dataIndex: "numCommande",
      key: "numCommande",
      render: (numCommande, { id }) => (
        <Link to={`/sale/${id}`}>{numCommande}</Link>
      ),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      render: (date) => moment(date).format("DD-MM-YYYY, HH:mm"),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Nom Client",
      dataIndex: `customer`,
      key: "customer_id",
      render: (customer) => customer?.username,
      sorter: (a, b) => a.customer.username.localeCompare(b.customer.username),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Livré",
      dataIndex: "delivred",
      key: "delivred",
      render: (delivred, { id }) =>
        // !currentRole ? (
        //   <Link to={`/sale/${id}`}>
        //     <button
        //       className={` ${
        //         delivred ? "bg-success" : "bg-danger"
        //       }`}
        //     >
        //       {delivred ? "Oui" : "Non"}
        //     </button>
        //   </Link>
        // ) : (
          <span
            className={`${delivred ? "bg-success" : "bg-danger"}`}
            style={{
              display: "inline-block", 
              width: "50px",
              height: "25px", 
              textAlign: "center",
              lineHeight: "25px" 
            }}
          
          >
            {delivred ? "Oui" : "Non"}
          </span>,
        // ),

      sorter: (a, b) => a.delivred - b.delivred,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Type Client",
      dataIndex: `customer`,
      key: "customer",
      render: (customer) => customer?.role,
      sorter: (a, b) => a.customer.role.localeCompare(b.customer.role),
      sortDirections: ["ascend", "descend"]
    },

    {
      title: "Montant Total",
      dataIndex: "total_amount",
      key: "total_amount",
      sorter: (a, b) => a.total_amount - b.total_amount,
      sortDirections: ["ascend", "descend"]
    },
    // {
    //   title: "Remise",
    //   dataIndex: "discount",
    //   key: "discount",
    //   sorter: (a, b) => a.discount - b.discount,
    //   sortDirections: ["ascend", "descend"]
    // },
    {
      title: "Prête",
      dataIndex: "ready",
      key: "ready",
      render: (ready) => (
        <span
          className={`${ready ? "bg-success" : "bg-danger"}`}
          style={{
            display: "inline-block", 
            width: "50px",
            height: "25px", 
            textAlign: "center",
            lineHeight: "25px" 
          }}
        >
          {ready ? "Oui" : "Non"}
        </span>
      ),
      sorter: (a, b) => a.ready - b.ready,
      sortDirections: ["ascend", "descend"]
    },
    // {
    //   title: "Montant Payé",
    //   dataIndex: "paid_amount",
    //   key: "paid_amount",
    //   responsive: ["md"],
    //   sorter: (a, b) => a.paid_amount - b.paid_amount,
    //   sortDirections: ["ascend", "descend"]
    // },
    {
      title: "Montant à Payer",
      dataIndex: "due_amount",
      key: "due_amount",
      responsive: ["md"],
      sorter: (a, b) => a.due_amount - b.due_amount,
      sortDirections: ["ascend", "descend"]
    },
    // {
    //   title: "Nom du fournisseur",
    //   dataIndex: `supplier`,
    //   key: "supplier_id",
    //   render: (supplier) => supplier?.name,
    //   sorter: (a, b) => a.supplier.name.localeCompare(b.supplier.name),
    //   sortDirections: ["ascend", "descend"],
    // },
    // {
    //   title: "Bénéfice",
    //   dataIndex: "profit",
    //   key: "profit",
    //   responsive: ["md"],
    //   sorter: (a, b) => a.profit - b.profit,
    //   sortDirections: ["ascend", "descend"]
    // },
    {
      title: "Utilisateur",
      key: "user_or_customer",
      align: "center",
      render: (text, record) => {
        if (
          record.creatorType === "user" &&
          record.userCreator &&
          record.userCreator.username
        ) {
          return record.userCreator.username; // Affiche le nom de l'utilisateur
        } else if (
          record.creatorType === "customer" &&
          record.customerCreator &&
          record.customerCreator.username
        ) {
          return record.customerCreator.username; // Affiche le nom du client
        } else {
          return "N/A"; // Valeur par défaut si aucune des conditions n'est remplie
        }
      }
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "payment",
      render: (id, record) =>
        !currentRole ? (
          <Link to={`/payment/customer/${id}`}>
            <button
              className={`btn btn-sm ${
                record.due_amount === 0 ? "btn-success" : "btn-danger"
              }`}
            >
              Paiement
            </button>
          </Link>
        ) : (
          <button
            className={`btn btn-sm ${
              record.due_amount === 0 ? "btn-success" : "btn-danger"
            }`}
          >
            Paiement
          </button>
        )
    }
  ];

  useEffect(() => {
    let filteredColumns = columns;
    if (currentRole) {
      filteredColumns = columns.filter(
        (column) =>
          column.key !== "profit" &&
          column.key !== "user_or_customer" &&
          column.key !== "discount" &&
          column.key !== "customer"
      );
    }
    setColumnsToShow(filteredColumns);
  }, [currentRole]);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <>
      {/* {list && (
        <div style={{ marginBottom: "30px" }}>
          <Dropdown
            menu={
              <Menu onClick={colVisibilityClickHandler} items={columnItems} />
            }
            placement="bottomLeft"
          >
            <Button className="column-visibility">Column Visibility</Button>
          </Dropdown>
        </div>
      )} */}
      <Table
        scroll={{ x: true }}
        loading={!list}
        pagination={{
          pageSize: count || 10,
          pageSizeOptions: [10, 20, 50, 100, 200],
          showSizeChanger: true,
          total: total,
          onChange: (page, limit) => {
            dispatch(
              loadAllSale({
                page,
                limit,
                startdate,
                enddate,
                user: ""
              })
            );
          }
        }}
        columns={columnsToShow}
        dataSource={
          list
            ? addKeys(
                currentRole
                  ? list.filter(
                      (item) => item.customer.username === loggedInUser
                    )
                  : list
              )
            : []
        }
      />
    </>
  );
}

const GetAllSale = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.sales.list);
  const total = useSelector((state) => state.sales.total);
  const customer = useSelector((state) => state.customers.customer);
  const userList = useSelector((state) => state.users.list);
  const [user, setUser] = useState("");
  const [count, setCount] = useState(10); // Valeur par défaut pour la pagination
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("id");
  const [startdate, setStartdate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [enddate, setEnddate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadAllStaff({ status: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSingleCustomer(id));
  }, [id]);

  useEffect(() => {
    dispatch(
      loadAllSale({
        page: currentPage,
        limit: count,
        startdate,
        enddate,
        user
      })
    );
  }, [currentPage, count, startdate, enddate, user, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onSearchFinish = async (values) => {
    setUser(values?.user || "");
    setLoading(true);
    await dispatch(
      loadAllSale({
        page: 1, // Reset to first page on new search
        limit: count,
        startdate,
        enddate,
        user: values?.user || ""
      })
    );
    setLoading(false);
  };

  const onSwitchChange = (value) => {
    setCount(value);
    setCurrentPage(1); // Reset to first page when changing count
  };

  const onCalendarChange = (dates) => {
    setStartdate(dates[0].format("YYYY-MM-DD"));
    setEnddate(dates[1].format("YYYY-MM-DD"));
  };

  const { RangePicker } = DatePicker;

  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const loggedInUser = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const isProfessional = role === "Professionnel";
  const isParticulier = role === "Particulier";

  const currentRole = isProfessional
    ? "Professionnel"
    : isParticulier
    ? "Particulier"
    : null;
  

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <div className="card card-custom mt-1">
        <div className="card-body">
          {currentRole && (
            <Fragment>
              <PageTitle title={"Retour"} subtitle={"LISTE DES ACHATS"} />
              <hr></hr>
              <div className="d-flex">
                <div className="col-md-6 d-flex justify-content-start">
                  <h5 className="d-inline-flex">Liste de mes commandes </h5>
                </div>
                {/* <div className="col-md-6 d-flex justify-content-end">
                  <DueClientNotification list={filteredList} />
                </div> */}
              </div>
              <hr></hr>
              <br></br>
              <br></br>
              <div>
                <DashboardCardByCus information={customer} />
              </div>
              <div>
                <CustomerInvoiceList
                  list={customer?.saleInvoice}
                  key={customer?.saleInvoice?.id}
                  linkTo="/sale"
                />
              </div>
            </Fragment>
          )}

          {!currentRole && (
            <Fragment>
              <PageTitle
                title={"Retour"}
                subtitle={"LISTE DES FACTURES DE VENTE"}
              />
              <hr></hr>
              <h5 className="d-inline-flex">Liste des factures de vente</h5>
              <div className="card-title d-flex flex-column flex-md-row align-items-center justify-content-md-center mt-1 py-2">
                <div>
                  <Form onFinish={onSearchFinish} layout={"inline"}>
                    {/* <Form.Item name="user">
                      <Select
                        loading={!userList}
                        placeholder="Vendeur"
                        style={{ width: 200 }}
                        allowClear
                      >
                        <Select.Option value="">Toute</Select.Option>
                        {userList &&
                          userList.map((i) => (
                            <Select.Option key={i.id} value={i.id}>
                              {i.username}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item> */}
                    <div className=" me-2">
                      <RangePicker
                        onCalendarChange={onCalendarChange}
                        defaultValue={[
                          moment().startOf("month"),
                          moment().endOf("month")
                        ]}
                        className="range-picker"
                      />
                    </div>
                    <Form.Item>
                      <Button
                        onClick={() => setLoading(true)}
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        size="small"
                      >
                        <SearchOutlined />
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <DashboardCard
                information={total?._sum}
                count={total?._count}
                isCustomer={true}
              />
              <div className="row">
                <div className="col-md-12 d-flex align-items-center mt-1">
                  {list && (
                    <div className="col-md-6 card-title d-flex justify-content-start align-items-center">
                      <div className="me-2">
                        <CSVLink
                          data={list}
                          date={{ startdate, enddate }}
                          user={user}
                          className="btn btn-dark btn-sm mb-1"
                          filename="sales"
                          style={{ margin: "5px" }}
                        >
                          Télécharger .CSV
                        </CSVLink>
                      </div>
                      <div className="me-2" style={{ marginTop: "-4px" }}>
                        <Segmented
                          className="text-center rounded danger"
                          size="middle"
                          options={[
                            {
                              label: (
                                <span>
                                  <i className="bi bi-person-lines-fill"></i>{" "}
                                  toute
                                </span>
                              ),
                              value: total?._count?.id || 0
                            },
                            {
                              label: (
                                <span>
                                  <i className="bi bi-person-dash-fill"></i>{" "}
                                  Paginé
                                </span>
                              ),
                              value: 10
                            }
                          ]}
                          value={count}
                          defaultChecked={total?._count?.id || 0}
                          onChange={onSwitchChange}
                        />
                      </div>
                      <div>
                        <SaleReportPrint
                          data={list}
                          date={{ startdate, enddate }}
                          user={user}
                          total={total?._sum}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <CustomTable
                list={list}
                total={total?._count?.id}
                startdate={startdate}
                enddate={enddate}
                count={count}
                user={user}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </Fragment>
          )}
        </div>
      </div>
    </>
  );
};

export default GetAllSale;
