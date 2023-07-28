import { Card, Col, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UserListCard = ({ list }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id_no",
      key: "id_no",
      render: (id_no, { id }) => <Link to={`/hr/staffs/${id}`}>{id_no}</Link>,
      sorter: (a, b) => a.id_no - b.id_no,
    },
    {
      title: "Nom d’utilisateur",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "téléphone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "salaire",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "department",
      dataIndex: "department",
      key: "department",
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <Row>
      <Col span={24}>
        <Card
          className="header-solid h-full"
          bordered={false}
          title={[
            <h5 className="font-semibold m-0 text-center">
              Informations sur le personnel
            </h5>,
          ]}
          bodyStyle={{ padding: "0" }}
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

export default UserListCard;
