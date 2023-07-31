import { Card, Col, Row, Table } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const CustomerTransactionList = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/transaction/${id}`}>{id}</Link>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
      sorter: (a, b) => a.debit?.name.localeCompare(b.debit?.name),
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
      sorter: (a, b) => a.credit?.name.localeCompare(b.credit?.name),
    },
    {
      title: "Montant",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type ",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Particuliers",
      dataIndex: "particulars",
      key: "particulars",
      sorter: (a, b) => a.particulars.localeCompare(b.particulars),
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className="mt-2">
        <Card
          className="header-solid h-full"
          bordered={false}
          title={[
            <h6 className="font-semibold m-0 text-center">
              Toutes les informations de retour
            </h6>,
          ]}
          bodyStyle={{ paddingTop: "0" }}
        >
          <div className="col-info">
            <Table
              scroll={{ x: true }}
              loading={!list}
              columns={columns}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default CustomerTransactionList;
