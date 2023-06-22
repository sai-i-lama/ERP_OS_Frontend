import React from "react";
import { Card, Row, Col, Table } from "antd";
import { Link } from "react-router-dom";

const PurchaseProductListCard = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "product",
      key: "product.name",
      render: (product) => (
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      ),
    },
    {
      title: "Product Quantity",
      dataIndex: "product_quantity",
      key: "product_quantity",
    },
    {
      title: "Product Purchase Price",
      dataIndex: "product_purchase_price",
      key: "product_purchase_price",
    },
    {
      title: "Total Price ",
      key: "Total Price ",
      dataIndex: "",
      render: ({ product_quantity, product_purchase_price }) =>
        product_purchase_price * product_quantity,
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className='mt-2'>
        <Card
          className='header-solid h-full'
          bordered={false}
          title={[
            <h6 className='font-semibold m-0 text-center'>
              Purchase Product Information
            </h6>,
          ]}
          bodyStyle={{ paddingTop: "0" }}
        >
          <div className='col-info'>
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
