import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/user/loginUserAction";

import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";

//TODO : redirect to home

const Login = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;

  const onFinish = async (values) => {
    const resp = await dispatch(addUser(values));
    if (resp === "success") {
      setLoader(false);
      window.location.href = "/dashboard";
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
    toast.error("Erreur de connexion Veuillez réessayer");
  };

  return (
    <>
      <Row className="card-row">
        <Col span={24}>
          <Card bordered={false} className={styles.card}>
            <Title level={3} className="m-3 text-center">
            Connectez-vous
            </Title>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                className="mb-1"
                label="Nom d’utilisateur"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre nom d’utilisateur!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="mb-2"
                label="Mot de passe"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre mot de passe!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className={styles.submitBtnContainer}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Envoyer
                </Button>
              </Form.Item>

              <Form.Item className={styles.loginTableContainer}>
                <Row>
                  <Col span={24}>
                    <LoginTable />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
