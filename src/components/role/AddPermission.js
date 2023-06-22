import {
  Button, Card, Col, Form, Row, Select,
  Tag, Typography
} from "antd";

import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";
import { addPermission, loadPermission } from "./roleApis";

const AddPermission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { Option } = Select;
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    loadPermission().then((d) => setPermissions(d));
  }, [id]);

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;
  const roleName = data.name;
  const rolePermissions = data.rolePermission;

  const { Title } = Typography;
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    const { permission_id } = values;

    try {
      const data = {
        role_id: parseInt(id),
        permission_id: permission_id.map(Number),
      };

      const resp = await addPermission(data); //permision func

      if (resp.message === "success") {
        navigate(-1);
        setLoader(false);
      }
      if (resp.message === "error") {
        toast.error("Error at giving permission, Try again");
        setLoader(false);
        form.resetFields();
      }

      form.resetFields();
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
  };

  const handleChange = (value) => {};

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title={"Back"} />
      <Row className="mr-top">
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={14}
          className="border rounded column-design"
        >
          <Card bordered={false} className="criclebox h-full">
            <Title level={3} className="m-3 text-center">
              Add Permission : <span className="text-primary">{roleName}</span>
            </Title>

            <Form
              form={form}
              className="m-4"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Has Permissions"
                style={{ marginBottom: "20px" }}
              >
                {rolePermissions &&
                  rolePermissions.map((i) => (
                    <Tag color="processing"> {i.permission.name} </Tag>
                  ))}
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="New Permission"
                name="permission_id"
                rules={[
                  {
                    required: true,
                    message: "Please input customer name!",
                  },
                ]}
              >
                <Select
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                  onChange={handleChange}
                >
                  {permissions &&
                    permissions.map((permission) => (
                      <Option key={permission.id}>{permission.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  onClick={() => setLoader(true)}
                  block
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                >
                  Permit Now
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddPermission;
