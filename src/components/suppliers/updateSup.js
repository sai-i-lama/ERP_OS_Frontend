import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Main from "../layouts/Main";
import PageTitle from "../page-header/PageHeader";

//Update Supplier API REQ
const updateSupplier = async (id, values) => {
  try {
    await axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `supplier/${id}`,
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

function UpdateSup() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const sup = data;
  const [initValues, setInitValues] = useState({
    name: sup.name,
    phone: sup.phone,
    address: sup.address,
    due_amount: sup.due_amount,
  });

  const onFinish = (values) => {
    try {
      updateSupplier(id, values);
      setSuccess(true);
      toast.success("Supplier details is updated");
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
    <Fragment>
      <Main>
        <PageTitle title={`Back`} />
        <div className='text-center'>
          <div className=''>
            <Row className='mr-top'>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={14}
                className='border rounded column-design '
              >
                {success && (
                  <div>
                    <Alert
                      message={`Supplier details updated successfully`}
                      type='success'
                      closable={true}
                      showIcon
                    />
                  </div>
                )}
                <Card bordered={false} className='criclebox h-full'>
                  <Title level={3} className='m-3 text-center'>
                    Edit Supplier Form
                  </Title>
                  <Form
                    initialValues={{
                      ...initValues,
                    }}
                    form={form}
                    className='m-4'
                    name='basic'
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                  >
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      fields={[{ name: "Name" }]}
                      label='Name'
                      name='name'
                      rules={[
                        {
                          required: true,
                          message: "Please input supplier name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label='Phone'
                      name='phone'
                      rules={[
                        {
                          required: true,
                          message: "Please input supplier Phone!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label='Address'
                      name='address'
                      rules={[
                        {
                          required: true,
                          message: "Please input supplier Address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label='Due Amount'
                      name='due_amount'
                      rules={[
                        {
                          type: Number,
                          required: true,
                          message: "Please input supplier amount!",
                        },
                      ]}
                    >
                      <Input type='number' />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        block
                        type='primary'
                        htmlType='submit'
                        shape='round'
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
      </Main>
    </Fragment>
  );
}

export default UpdateSup;
