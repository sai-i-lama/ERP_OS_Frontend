import React from "react";
import { Card, Row, Col, Table } from "antd";
import { Link } from "react-router-dom";

const PurchaseProductListCard = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nom",
      dataIndex: "product",
      key: "product.name",
      sorter: (a, b) => a.product.name.localeCompare(b.product.name),
      render: (product) => (
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      ),
    },
    {
      title: "Quantité de Produit",
      dataIndex: "product_quantity",
      key: "product_quantity",
      sorter: (a, b) => a.product_quantity - b.product_quantity,
    },
    {
      title: "Prix d’achat du produit",
      dataIndex: "product_purchase_price",
      key: "product_purchase_price",
      sorter: (a, b) => a.product_purchase_price - b.product_purchase_price,
    },
    {
      title: "Prix Total",
      key: "Total Price",
      dataIndex: "",
      render: ({ product_quantity, product_purchase_price }) =>
        product_purchase_price * product_quantity,
      sorter: (a, b) =>
        a.product_quantity * a.product_purchase_price -
        b.product_quantity * b.product_purchase_price,
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
              informations sur les produits achetés
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

export default PurchaseProductListCard;
