import React, { useState } from "react";

import {
	Alert,
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
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams
} from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllDesignation } from "../../redux/actions/designation/getDesignationAction";
import PageTitle from "../page-header/PageHeader";
import { getRoles } from "../role/roleApis";

//Update User API REQ
const updateStaff = async (id, values) => {
  try {
    await axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/${id}`,
      data: {
        ...values,
      },
    });
    return "success";
    // return data;
  } catch (error) {
    console.log(error.message);
  }
};

function UpdateStaff() {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const [loader, setLoader] = useState(false);

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;
  const designation = useSelector((state) => state.designations?.list);
  useEffect(() => {
    dispatch(loadAllDesignation());
  }, []);

  const user = data;
  const [initValues, setInitValues] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    address: user.address,
    phone: user.phone,
    designation_id: user.designation_id,
    blood_group: user.blood_group,
    department: user.department,
    id_no: user.id_no,
    salary: user.salary,
    status: user.status,
  });

  const navigate = useNavigate();

  const { Option } = Select;
  const [list, setList] = useState(null);

  useEffect(() => {
    getRoles()
      .then((d) => setList(d))
      .catch((error) => console.log(error));
  }, []);

  const onFinish = async (values) => {
    try {
      const resp = await updateStaff(id, values);

      setSuccess(true);
      toast.success("User Details updated");
      setInitValues({});
      if (resp === "success") {
        setLoader(false);
        if (role !== "admin") {
          navigate("/auth/logout");
        }
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));
  const role = localStorage.getItem("role");

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <>
      <PageTitle title={`Back`} />
      <div className="text-center">
        <div className="">
          <Row className="mr-top">
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={14}
              className="border rounded column-design "
            >
              {success && (
                <div>
                  <Alert
                    message={`User details updated successfully`}
                    type="success"
                    closable={true}
                    showIcon
                  />
                </div>
              )}
              <Card bordered={false} className="criclebox h-full">
                <Title level={3} className="m-3 text-center">
                  Edit : {initValues.username}
                </Title>
                <Form
                  initialValues={{
                    ...initValues,
                  }}
                  form={form}
                  className="m-4"
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 20,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    fields={[{ name: "Name" }]}
                    label="Userame"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input User name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Change Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input New Password!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {role === "admin" ? (
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Pleases Select Type!",
                        },
                      ]}
                      label="Staff Type "
                      name={"role"}
                      style={{ marginBottom: "20px" }}
                    >
                      <Select
                        optionFilterProp="children"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
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
                  ) : (
                    ""
                  )}

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
                    <DatePicker />
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
                    <DatePicker />
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
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
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
                      offset: 8,
                    }}
                  >
                    <Button
                      onClick={() => setLoader(true)}
                      loading={loader}
                      block
                      type="primary"
                      htmlType="submit"
                      shape="round"
                    >
                      Change Now
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default UpdateStaff;
