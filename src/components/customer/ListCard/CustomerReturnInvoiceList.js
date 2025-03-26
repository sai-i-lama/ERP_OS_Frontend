import React from "react";
import { Card, Row, Col, Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const CustomerReturnInvoiceList = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Montant Total",
      dataIndex: "total_amount",
      key: "total_amount",
      sorter: (a, b) => a.total_amount - b.total_amount,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      sorter: (a, b) => a.note.localeCompare(b.note),
    },
    {
      title: "Facture de vente N°",
      dataIndex: "saleInvoice_id",
      key: "saleInvoice_id",
      render: (saleInvoice_id) => (
        <Link to={`/sale/${saleInvoice_id}`}>{saleInvoice_id}</Link>
      ),
      sorter: (a, b) => a.saleInvoice_id - b.saleInvoice_id,
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

export default CustomerReturnInvoiceList;
