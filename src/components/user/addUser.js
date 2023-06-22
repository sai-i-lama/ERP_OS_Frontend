import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Typography
} from "antd";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/actions/designation/getDesignationAction";
import { addStaff } from "../../redux/actions/user/addStaffAciton";
import { getRoles } from "../role/roleApis";

const AddUser = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { Option } = Select;
  const [list, setList] = useState(null);

  // const [j_date, setJ_date] = useState(moment());
  // const [l_date, setL_date] = useState(moment());

  // useseletor to get designations from redux
  const designation = useSelector((state) => state.designations?.list);

  useEffect(() => {
    getRoles()
      .then((d) => setList(d))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    dispatch(loadAllDesignation());
  }, []);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addStaff(values));
      setLoader(true);
      if (resp === "success") {
        setLoader(false);
      } else {
        setLoader(false);
      }

      form.resetFields();
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    console.log("Failed:", errorInfo);
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
          className="column-design border rounded bg-white"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Add New Staff
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Joining Date"
                name="join_date"
                rules={[
                  {
                    required: true,
                    message: "Please input joining date!",
                  },
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Leave Date"
                name="leave_date"
                rules={[
                  {
                    required: true,
                    message: "Please input leave date!",
                  },
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Pleases Select Type!",
                  },
                ]}
                label="Role"
                name={"role"}
                style={{ marginBottom: "20px" }}
              >
                <Select
                  loading={!list}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                >
                  {list &&
                    list.map((role) => (
                      <Option key={role.name}>{role.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Id No"
                name="id_no"
                rules={[
                  {
                    required: true,
                    message: "Please input id no",
                  },
                ]}
              >
                <Input placeholder="OE-012" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input phone",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input address",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Salary"
                name="salary"
                rules={[
                  {
                    required: true,
                    message: "Please input salary",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Blood Group"
                name="blood_group"
                rules={[
                  {
                    required: true,
                    message: "Please input blood group",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Pleases Select Designation!",
                  },
                ]}
                label="Designation"
                name={"designation_id"}
                style={{ marginBottom: "20px" }}
              >
                <Select
                  loading={!designation}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  mode="single"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Please select"
                >
                  {designation &&
                    designation.map((desg) => (
                      <Option key={desg.id}>{desg.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 4,
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
                  Add New Staff
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddUser;
