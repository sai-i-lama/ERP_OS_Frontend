import { Link } from "react-router-dom";
import { Table, Button } from "antd";
import "./card.css";
import moment from "moment";

function SupplierInvoiceTable({ list, linkTo }) {
  const columns = [
    {
      title: "Invoice ",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`${linkTo}/${id}`}>{id}</Link>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      responsive: ["md"],
    },
    {
      title: "Paid Amount",
      dataIndex: "paid_amount",
      key: "paid_amount",
      responsive: ["md"],
    },
    {
      title: "Due Amount",
      dataIndex: "due_amount",
      key: "due_amount",
      responsive: ["md"],
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "payment",
      render: (id) => (
        <Link to={`/payment/supplier/${id}`}>
          <button className='btn btn-dark btn-sm'> Payment</button>
        </Link>
      ),
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div>
      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columns}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

export default SupplierInvoiceTable;
