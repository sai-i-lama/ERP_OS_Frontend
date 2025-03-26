import { Button, Card, Col, Dropdown, Menu, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TransactionPurchaseList = ({ list }) => {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

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
      render: (debit) => debit.name,
      sorter: (a, b) => a.debit.name.localeCompare(b.debit.name),
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit.name,
      sorter: (a, b) => a.credit.name.localeCompare(b.credit.name),
    },
    {
      title: "Montant",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
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
              Informations sur les transactions
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
                    items={columnsToShow}
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
              columns={columns}
              dataSource={list ? addKeys(list) : []}
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TransactionPurchaseList;
