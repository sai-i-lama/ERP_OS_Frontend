import { Link } from "react-router-dom";
import { Table, Card } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";

function CustomerInvoiceList({ list, linkTo }) {
  const [columnsToShow, setColumnsToShow] = useState([]);
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
      align: "center",
      render: (numCommande, { id }) => (
        <Link to={`${linkTo}/${id}`}>{numCommande}</Link>
      ),
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (date) => moment(date).format("DD MM YY HH:mm")
    },
    {
      title: "Retirée",
      dataIndex: "delivred",
      key: "delivred",
      align: "center",
      render: (delivred,) =>
         (
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
          </span>
        ),
      sorter: (a, b) => a.delivred - b.delivred,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Montant Total",
      dataIndex: "total_amount",
      align: "center",
      key: "total_amount",
      sorter: (a, b) => a.total_amount - b.total_amount
    },
    {
      title: "Remise",
      dataIndex: "discount",
      key: "discount",
      align: "center",
      responsive: ["md"],
      sorter: (a, b) => a.discount - b.discount
    },
    {
      title: "Montant payé",
      dataIndex: "paid_amount",
      key: "paid_amount",
      align: "center",
      responsive: ["md"],
      sorter: (a, b) => a.paid_amount - b.paid_amount
    },
    {
      title: "Montant à payer",
      dataIndex: "due_amount",
      align: "center",
      key: "due_amount",
      responsive: ["md"],
      sorter: (a, b) => a.due_amount - b.due_amount
    },
    {
      title: "Bénéfice",
      dataIndex: "profit",
      key: "profit",
      align: "center",
      responsive: ["md"],
      sorter: (a, b) => a.profit - b.profit
    },
    {
      title: "Prête",
      dataIndex: "ready",
      key: "ready",
      align: "center",
      render: (ready,) =>
         (
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
    {
      title: "Action",
      dataIndex: "id",
      align: "center",
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
          <span
            className={`${
              record.due_amount === 0 ? "bg-success" : "bg-danger"
            }`}
            style={{
              display: "inline-block", 
              width: "100px",
              height: "25px", 
              textAlign: "center",
              lineHeight: "25px" 
            }}
          >
            Paiement
          </span>
        )
    }
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  useEffect(() => {
    let filteredColumns = columns;
    if (currentRole) {
      filteredColumns = columns.filter(
        (column) => column.key !== "profit" && column.key !== "discount"
      );
    }
    console.log("Filtered Columns:", filteredColumns); // Debugging line
    setColumnsToShow(filteredColumns);
  }, [currentRole]);

  return (
    <div className="mt-1">
      <Card
        className="header-solid h-full"
        bordered={false}
        title={[
          <h5 className="font-semibold m-0 text-center">
            Liste de vos commandes
          </h5>
        ]}
        bodyStyle={{ paddingTop: "0" }}
      >
        <Table
          scroll={{ x: true }}
          loading={!list}
          columns={columnsToShow} // Use columnsToShow here
          dataSource={list ? addKeys(list) : []}
        />
      </Card>
    </div>
  );
}

export default CustomerInvoiceList;
