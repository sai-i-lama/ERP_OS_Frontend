import { Button, Card, Col, Dropdown, Menu, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReturnPurchaseInvoiceProductList from "../../popUp/returnPurchaseProductList";

const ReturnPurchaseInvoiceList = ({ list }) => {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "Details",
      dataIndex: "returnPurchaseInvoiceProduct",
      key: "returnPurchaseInvoiceProduct",
      render: (returnPurchaseInvoiceProduct) => (
        <ReturnPurchaseInvoiceProductList list={returnPurchaseInvoiceProduct} />
      ),
    },
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
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

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
      label: <span>{item.title}</span>,
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24} className="mt-2">
        <Card
          className="header-solid h-full"
          bordered={false}
          title={[
            <h6 className="font-semibold m-0 text-center">
              Informations sur les retours d’achat
            </h6>,
          ]}
          bodyStyle={{ paddingTop: "0" }}
        >
          {list && (
            <div style={{ margin: "30px 0" }}>
              <Dropdown
                menu={
                  <Menu
                    onClick={colVisibilityClickHandler}
                    items={columnItems}
                  />
                }
                placement="bottomLeft"
              >
                <Button className="column-visibility">Column Visibility</Button>
              </Dropdown>
            </div>
          )}
          <div className="col-info">
            <Table
              scroll={{ x: true }}
              loading={!list}
              columns={columnsToShow}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ReturnPurchaseInvoiceList;
