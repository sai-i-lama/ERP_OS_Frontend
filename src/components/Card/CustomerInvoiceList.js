import { Link } from "react-router-dom";
import { Table, Card } from "antd";
import moment from "moment";
import React from "react";

function CustomerInvoiceList({ list, linkTo }) {
  const columns = [
    {
      title: "Facture",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id) => <Link to={`${linkTo}/${id}`}>{id}</Link>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (date) => moment(date).format("DD MM YY HH:mm"),
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
      title: "Montant à payer",
      dataIndex: "due_amount",
      key: "due_amount",
      responsive: ["md"],
      sorter: (a, b) => a.due_amount - b.due_amount,
    },
    {
      title: "Montant payé",
      dataIndex: "paid_amount",
      key: "paid_amount",
      responsive: ["md"],
      sorter: (a, b) => a.paid_amount - b.paid_amount,
    },
    {
      title: "Bénéfice",
      dataIndex: "profit",
      key: "profit",
      responsive: ["md"],
      sorter: (a, b) => a.profit - b.profit,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "payment",
      render: (id, record) => (
        <React.Fragment>
          <Link to={`/payment/customer/${id}`}>
            <button className={`btn btn-sm ${record.due_amount === 0 ? 'btn-success' : 'btn-danger'}`}>
              Paiement
            </button>
          </Link>
        </React.Fragment>
      ),
      fixed: "right",
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className="mt-1">
      <Card
        className="header-solid h-full"
        bordered={false}
        title={[
          <h5 className="font-semibold m-0 text-center">
            Informations sur la facture client
          </h5>,
        ]}
        bodyStyle={{ paddingTop: "0" }}
      >
        <Table
          scroll={{ x: true }}
          loading={!list}
          // pagination={{
          //   defaultPageSize: 10,
          //   pageSizeOptions: [10, 20, 50, 100, 200],
          //   showSizeChanger: true,
          //   total: total,

          //   // onChange: (page, limit) => {
          //   //   dispatch(loadSuppliers({ page, limit }));
          //   // },
          // }}
          columns={columns}
          dataSource={list ? addKeys(list) : []}
        />
      </Card>
    </div>
  );
}

export default CustomerInvoiceList;
