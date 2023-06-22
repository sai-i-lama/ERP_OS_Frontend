import React, { useState } from "react";

import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";

//Update Product API REQ
const updateProduct = async (id, values) => {
  try {
    await axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `product/${id}`,
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

function UpdateProd() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const prod = data;
  const [initValues, setInitValues] = useState({
    name: prod.name,
    quantity: prod.quantity,
    purchase_price: prod.purchase_price,
    sale_price: prod.sale_price,
  });

  const onFinish = (values) => {
    try {
      updateProduct(id, values);
      setSuccess(true);
      toast.success("Product details is updated");
      setInitValues({});
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

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
                    message={`Product details updated successfully`}
                    type="success"
                    closable={true}
                    showIcon
                  />
                </div>
              )}
              <Card bordered={false} className="criclebox h-full">
                <Title level={3} className="m-3 text-center">
                  Edit Product Form
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
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input product name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Quantity"
                    name="quantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product Quantity!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Purchase Price"
                    name="purchase_price"
                    rules={[
                      {
                        required: true,
                        message: "Please input Purchase price !",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    label="Sale Price"
                    name="sale_price"
                    rules={[
                      {
                        type: Number,
                        required: true,
                        message: "Please input  Sale Price!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    wrapperCol={{
                      offset: 8,
                    }}
                  >
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      shape="round"
                    >
                      Update Now
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

export default UpdateProd;
