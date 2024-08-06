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
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";
import DashboardCard from "../Card/DashboardCard";
import SaleReportPrint from "../Invoice/SaleReport";
import PageTitle from "../page-header/PageHeader";
import DueClientNotification from "../notification/DueClientNotification";

// //Date fucntinalities
// let startdate = moment(new Date()).format("YYYY-MM-DD HH:mm");
// let enddate = moment(new Date()).add(1, "day").format("YYYY-MM-DD HH:mm");

function CustomTable({ list, total, startdate, enddate, count, user }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);
  const dispatch = useDispatch();

  const loggedInUser = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const columns = [
    {
      title: "N° facture",
      dataIndex: "numCommande",
      key: "numCommande",
      align: "center",
      render: (numCommande, { id }) => (
        <Link to={`/sale/${id}`}>{numCommande}</Link>
      ),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => moment(date).format("DD/MM/YY HH:mm"),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Nom Client",
      dataIndex: `customer`,
      key: "customer_id",
      align: "center",
      render: (customer) => customer?.username,
      sorter: (a, b) => a.customer.username.localeCompare(b.customer.username),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Type Client",
      dataIndex: `customer`,
      key: "customer",
      align: "center",
      render: (customer) => customer?.role,
      sorter: (a, b) => a.customer.role.localeCompare(b.customer.role),
      sortDirections: ["ascend", "descend"]
    },
    // {
    //   title: "Livré",
    //   dataIndex: "delivred",
    //   key: "delivred",
    //   render: (delivred) => (delivred ? "Oui" : "Non"),
    //   sorter: (a, b) => a.delivred - b.delivred,
    //   sortDirections: ["ascend", "descend"]
    // },
    // {
    //   title: "Retiré",
    //   dataIndex: "delivred",
    //   key: "delivred",
    //   render: (delivred, { id }) =>
    //     role !== "Professionnel" ? (
    //       <Link to={`/sale/${id}`}>
    //         <button
    //           className={`btn btn-sm ${
    //             delivred ? "btn-success" : "btn-danger"
    //           }`}
    //         >
    //           {delivred ? "Oui" : "Non"}
    //         </button>
    //       </Link>
    //     ) : (
    //       <button
    //         className={`btn btn-sm ${delivred ? "btn-success" : "btn-danger"}`}
    //       >
    //         {delivred ? "Oui" : "Non"}
    //       </button>
    //     ),
    //   sorter: (a, b) => a.delivred - b.delivred,
    //   sortDirections: ["ascend", "descend"]
    // },
    {
      title: "Montant Total",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
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
    // {
    //   title: "Montant Payé",
    //   dataIndex: "paid_amount",
    //   key: "paid_amount",
    //   responsive: ["md"],
    //   sorter: (a, b) => a.paid_amount - b.paid_amount,
    //   sortDirections: ["ascend", "descend"]
    // },
    // {
    //   title: "Montant à Payer",
    //   dataIndex: "due_amount",
    //   key: "due_amount",
    //   responsive: ["md"],
    //   sorter: (a, b) => a.due_amount - b.due_amount,
    //   sortDirections: ["ascend", "descend"]
    // },
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
      title: "Vendeur",
      dataIndex: "user",
      key: "user",

      render: (user) => user?.username,
      responsive: ["md"],
      sorter: (a, b) => a.user.username.localeCompare(b.user.username),
      sortDirections: ["ascend", "descend"]
    }
    // {
    //   title: "Action",
    //   dataIndex: "id",
    //   key: "payment",
    //   render: (id, record) =>
    //     role !== "Professionnel" ? (
    //       <Link to={`/payment/customer/${id}`}>
    //         <button
    //           className={`btn btn-sm ${
    //             record.due_amount === 0 ? "btn-success" : "btn-danger"
    //           }`}
    //         >
    //           Paiement
    //         </button>
    //       </Link>
    //     ) : (
    //       <button
    //         className={`btn btn-sm ${
    //           record.due_amount === 0 ? "btn-success" : "btn-danger"
    //         }`}
    //       >
    //         Paiement
    //       </button>
    //     )
    // }
  ];

  useEffect(() => {
    let filteredColumns = columns;
    if (role === "Professionnel") {
      filteredColumns = columns.filter(
        (column) =>
          column.key !== "profit" &&
          column.key !== "user" &&
          column.key !== "discount" &&
          column.key !== "customer"
      );
    }
    setColumnsToShow(filteredColumns);
  }, [role]);

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
      {list && (
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
      )}
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
                user: role === "Professionnel" ? loggedInUser : user || ""
              })
            );
          }
        }}
        columns={columnsToShow}
        dataSource={
          list
            ? addKeys(
                role === "Professionnel"
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

const GetAllSaleMat = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.sales.list);
  const total = useSelector((state) => state.sales.total);
  const userList = useSelector((state) => state.users.list);
  const [user, setUser] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [startdate, setStartdate] = useState(
    moment().startOf("month").format("DD/MM/YY HH:mm")
  );
  const [enddate, setEnddate] = useState(
    moment().endOf("month").format("DD/MM/YY HH:mm")
  );

  useEffect(() => {
    dispatch(loadAllStaff({ status: true }));
  }, [dispatch]);

  const { RangePicker } = DatePicker;
  const totalCount = total?._count?.id;

  useEffect(() => {
    setCount(totalCount);
  }, [totalCount]);

  useEffect(() => {
    dispatch(
      loadAllSale({
        page: 1,
        limit: 10,
        startdate: moment().startOf("month"),
        enddate: moment().endOf("month"),
        user: ""
      })
    );
  }, []);

  const CSVlist = list?.map((i) => ({
    ...i,
    customer: i?.customer?.name
  }));

  const onSearchFinish = async (values) => {
    setCount(total?._count?.id);
    setUser(values?.user);
    const resp = await dispatch(
      loadAllSale({
        page: 1,
        limit: "",
        startdate: startdate,
        enddate: enddate,
        user: values.user ? values.user : ""
      })
    );
    if (resp.message === "success") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const [form] = Form.useForm();
  const onSwitchChange = (value) => {
    setCount(value);
    dispatch(
      loadAllSale({
        page: 1,
        limit: "",
        startdate: startdate,
        enddate: enddate,
        user: user || ""
      })
    );
  };

  // Filtrer la liste des produits pour ne garder que ceux avec type_product === "Produit fini"
  const filteredListMat = list?.filter(
    (sale) => sale.type_saleInvoice === "matière_première"
  );
  // Calculer le total des éléments filtrés
  const totalFilteredListMat = filteredListMat.reduce(
    (acc, item) => acc + item.total_amount,
    0
  );

  // Filtrer la liste des produits pour ne garder que ceux avec type_product === "Produit fini"
  const CVSfilteredListMat = CSVlist?.filter(
    (sale) => sale.type_saleInvoice === "matière_première"
  );

  const onCalendarChange = (dates) => {
    const newStartdate = dates[0].format("YYYY-MM-DD HH:mm");
    const newEnddate = dates[1].format("YYYY-MM-DD HH:mm");
    setStartdate(newStartdate ? newStartdate : startdate);
    setEnddate(newEnddate ? newEnddate : enddate);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const loggedInUser = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const filteredList = list?.filter(
    (item) => item.customer.username === loggedInUser
  );

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title={"Retour"} subtitle={"LISTE DES MATIÈRES PREMIÈRES"} />
      <div className="card card-custom mt-1">
        <div className="card-body">
          <h5 className="d-inline-flex">
            Listes des Matières Premières Sorties en Stock
          </h5>
          <div className="card-title d-flex flex-column flex-md-row align-items-center justify-content-md-center mt-1 py-2">
            <div>
              <Form
                onFinish={onSearchFinish}
                form={form}
                layout={"inline"}
                onFinishFailed={() => setLoading(false)}
              >
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
                        <Select.Option value={i.id}>{i.username}</Select.Option>
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
          {/* <DashboardCard
            information={total?._sum}
            count={total?._count}
            isCustomer={true}
          /> */}
          <br />
          <div className="row">
            <div className="col-md-12 d-flex align-items-center mt-1">
              {list && (
                <div className="col-md-6 card-title d-flex justify-content-start align-items-center">
                  <div className="me-2">
                    <CSVLink
                      data={CVSfilteredListMat}
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
                              <i className="bi bi-person-lines-fill"></i> toute
                            </span>
                          ),
                          value: totalCount
                        },
                        {
                          label: (
                            <span>
                              <i className="bi bi-person-dash-fill"></i> Paginé
                            </span>
                          ),
                          value: 10
                        }
                      ]}
                      value={count}
                      defaultChecked={totalCount}
                      onChange={onSwitchChange}
                    />
                  </div>
                  <div>
                    <SaleReportPrint
                      data={filteredListMat}
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
            list={filteredListMat}
            total={total?._count?.id}
            startdate={startdate}
            enddate={enddate}
            count={count}
            user={user}
          />
        </div>
      </div>
    </>
  );
};

export default GetAllSaleMat;
