import {
    Button,
    Card,
    Col, Dropdown, Form,
    Input, Menu, Row,
    Table,
    Typography
} from "antd";

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addRole, getRoles } from "./roleApis";

function CustomTable({ list }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Link to={`/role/${id}/`}>
          <button className="btn btn-dark btn-sm"> View</button>
        </Link>
      ),
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
    <Card>
      <div className="text-center my-2 d-flex justify-content-between">
        <h5 className="role-list-title">Role List</h5>
        {list && (
          <div>
            <CSVLink
              data={list}
              className="btn btn-dark btn-sm mb-1"
              filename="roles"
            >
              Download CSV
            </CSVLink>
          </div>
        )}
      </div>

      {list && (
        <div style={{ marginBottom: "30px" }}>
          <Dropdown
            overlay={
              <Menu onClick={colVisibilityClickHandler} items={columnItems} />
            }
            placement="bottomLeft"
          >
            <Button className="column-visibility">Column Visibility</Button>
          </Dropdown>
        </div>
      )}

      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </Card>
  );
}

const Role = () => {
  const [list, setList] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getRoles()
      .then((d) => setList(d))
      .catch((error) => console.log(error));
  }, []);

  const { Title } = Typography;

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await addRole(values);

    if (resp.message === "success") {
      setLoader(false);
      const newList = [...list];
      newList.push(resp.data);
      setList(newList);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding role");
    setLoader(false);
  };
  return (
    <Fragment bordered={false}>
      <Row className="mr-top">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={12}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 text-center">
            Add New Role
          </Title>
          <Form
            style={{ marginBottom: "100px" }}
            eventKey="role-form"
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div>
              <Form.Item
                style={{ marginBottom: "20px" }}
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 6,
                  span: 12,
                }}
              >
                <Button
                  onClick={() => setLoader(true)}
                  type="primary"
                  size="small"
                  htmlType="submit"
                  block
                  loading={loader}
                >
                  Add New Role
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
      <hr />
      <CustomTable list={list} />
    </Fragment>
  );
};

export default Role;
