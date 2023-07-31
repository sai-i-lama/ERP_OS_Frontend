import { Link } from "react-router-dom";
import { Table, Button } from "antd";
import "./card.css";
import moment from "moment";

function SupplierInvoiceTable({ list, linkTo }) {
  const columns = [
    {
      title: "Facture",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`${linkTo}/${id}`}>{id}</Link>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD MM YY HH:mm"),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Montant Total",
      dataIndex: "total_amount",
      key: "total_amount",
      sorter: (a, b) => a.total_amount - b.total_amount,
    },
    {
      title: "Remise",
      dataIndex: "discount",
      key: "discount",
      responsive: ["md"],
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Montant payé",
      dataIndex: "paid_amount",
      key: "paid_amount",
      responsive: ["md"],
      sorter: (a, b) => a.paid_amount - b.paid_amount,
    },
    {
      title: "Montant à payer",
      dataIndex: "due_amount",
      key: "due_amount",
      responsive: ["md"],
      sorter: (a, b) => a.due_amount - b.due_amount,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "payment",
      render: (id) => (
        <Link to={`/payment/supplier/${id}`}>
          <button className="btn btn-dark btn-sm"> paiement</button>
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
