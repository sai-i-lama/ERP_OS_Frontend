import React, { Fragment, useState } from "react";

import { Button, Form, Input, Typography, Row, Col, Alert, Card } from "antd";
import PageTitle from "../page-header/PageHeader";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Main from "../layouts/Main";

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
      toast.success("Les détails du fournisseur sont mis à jour");
      setInitValues({});
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Main>
        <PageTitle title={`Retour`} />
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
                      message={`Les détails du fournisseur ont été mis à jour avec succès`}
                      type='success'
                      closable={true}
                      showIcon
                    />
                  </div>
                )}
                <Card bordered={false} className='criclebox h-full'>
                  <Title level={3} className='m-3 text-center'>
                  Modifier le formulaire fournisseur
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
                      label='Nom'
                      name='name'
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir le nom du fournisseur!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label='Téléphone'
                      name='phone'
                      rules={[
                        {
                          required: true,
                          message: "S’il vous plaît entrer le Téléphone du fournisseur !",
                        },
                      ]}
                    >
                      <Input maxLength={14}/>
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label='Adresse'
                      name='address'
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir l’adresse du fournisseur!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label='Montant à payer'
                      name='due_amount'
                      rules={[
                        {
                          type: Number,
                          required: true,
                          message: "Veuillez saisir le montant du fournisseur!",
                        },
                      ]}
                    >
                      <Input type='number' min={0} />
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
                        Mettre à jour
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
