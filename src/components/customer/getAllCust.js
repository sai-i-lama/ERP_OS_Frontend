import {
  Button,
  Dropdown,
  Menu,
  Segmented,
  Table,
  Form,
  Input,
  Row,
  Col
} from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./customer.css";

import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import GetTotalCustomers from "../../api/getTotalCustomers";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { loadCusSearch } from "../../redux/actions/customer/getCustomerAction";

import moment from "moment";

function CustomTable({ list, total, status }) {
  const dispatch = useDispatch();
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "sku",
      key: "sku",
      sorter: (a, b) => a.sku - b.sku
    },
    {
      title: "Nom",
      dataIndex: "username",
      key: "username",
      render: (username, { id }) => (
        <Link to={`/customer/${id}`}>{username}</Link>
      ),
      sorter: (a, b) => a.username.localeCompare(b.username)
    },
    {
      title: "téléphone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone)
    },
    {
      title: "Type de Client",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role)
    },
    {
      title: "Adresse",
      dataIndex: "address",
      key: "address",
      responsive: ["md"],
      sorter: (a, b) => a.address.localeCompare(b.address)
    },
    {
      title: "Créé le",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YY HH:mm"),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Mis à jour le",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => moment(updatedAt).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
      sortDirections: ["ascend", "descend"]
    }
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));
  return (
    <div>
      {/* <div>
        {list && (
          <div style={{ marginBottom: "30px" }}>
            <Dropdown
              menu={
                <Menu onClick={colVisibilityClickHandler} items={columnItems} />
              }
              placement="bottomLeft"
            >
              <Button className="column-visibility">Column Visibility</Button>
            </Dropdown>
          </div>
        )}
      </div> */}
      <div>
        <Table
          scroll={{ x: true }}
          loading={!list}
          pagination={{
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            total: total,

            onChange: (page, limit) => {
              dispatch(loadAllCustomer({ page, limit, status }));
            }
          }}
          columns={columnsToShow}
          dataSource={list ? addKeys(list) : []}
        />
      </div>
    </div>
  );
}

const GetAllCust = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.customers.list);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    dispatch(loadAllCustomer({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    GetTotalCustomers().then((res) => setTotal(res));
  }, [list]);

  const [status, setStatus] = useState("true");
  const onChange = (value) => {
    setStatus(value);
    dispatch(loadAllCustomer({ status: value, page: 1, limit: 10 }));
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const resp = await dispatch(loadCusSearch(values.s_id));
    if (values.s_id === undefined) {
      setLoading(false);
      dispatch(loadAllCustomer({ status: "true", page: 1, limit: 10 }));
    }
    if (resp.status === "success") {
      setUserList(resp.data);
      form.resetFields();
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="card column-design">
      <div className="card-body">
        <Row>
          <Col sm={24} md={24} lg={24} span={24}>
            <h5>Liste des clients</h5>
          </Col>
        </Row>

        {list && (
          <div className="m-2">
            <Row>
              <Col sm={24} md={24} lg={12} span={24}>
                <Form
                  form={form}
                  layout="inline"
                  labelCol={{
                    span: 8
                  }}
                  wrapperCol={{
                    span: 16
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item label="Rechercher" name="s_id">
                    <Input />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 0,
                      span: 16
                    }}
                  >
                    <Button
                      loading={loading}
                      onClick={() => setLoading(true)}
                      className="ant-btn-new"
                      type="primary"
                      size="small"
                      htmlType="submit"
                    >
                      Rechercher
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={24} md={24} lg={12} sm={24}>
                <div className="text-center d-flex justify-content-end">
                  <div className="me-2" style={{ marginTop: "4px" }}>
                    <CSVLink
                      data={list}
                      className="btn btn-dark btn-sm mb-1"
                      filename="customer"
                      style={{ margin: "5px" }}
                    >
                      Télécharger .CSV
                    </CSVLink>
                  </div>
                  <div>
                    <Segmented
                      className="text-center rounded danger"
                      size="middle"
                      options={[
                        {
                          label: (
                            <span>
                              <i className="bi bi-person-lines-fill"></i> Active
                            </span>
                          ),
                          value: "true"
                        },
                        {
                          label: (
                            <span>
                              <i className="bi bi-person-dash-fill"></i>{" "}
                              Inactive
                            </span>
                          ),
                          value: "false"
                        }
                      ]}
                      value={status}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
        <CustomTable list={list} total={total} status={status} />
      </div>
    </div>
  );
};

export default GetAllCust;
