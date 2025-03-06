import React from "react";
import { Card, Row, Col, Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const SupplierTransactionList = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/transaction/${id}`}>{id}</Link>,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
      sorter: (a, b) => a.debit.name.localeCompare(b.debit.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
      sorter: (a, b) => a.credit.name.localeCompare(b.credit.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Montant",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Particuliers",
      dataIndex: "particulars",
      key: "particulars",
      sorter: (a, b) => a.particulars.localeCompare(b.particulars),
      sortDirections: ["ascend", "descend"],
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
              Toutes les informations sur les transactions
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

export default SupplierTransactionList;
