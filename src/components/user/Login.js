import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/user/loginUserAction";
import logo from "../../assets/images/sai-i-lama-logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const role = localStorage.getItem("role");
    if (isLogged) {
      if (role !== "professionnel") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/pos";
      }
    }
  }, []);

  const onFinish = async (values) => {
    const resp = await dispatch(addUser(values));
    const role = localStorage.getItem("role");

    if (resp === "success" && role !== "professionnel") {
      setLoader(false);
      window.location.href = "/dashboard";
    } else if (resp === "success" && role === "professionnel") {
      setLoader(false);
      window.location.href = "/pos";
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
              BIENVENUE A SAI I LAMA
            </Title>
            <div className={styles.logoContainer}>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "50%",
                  height: "50%",
                  objectFit: "cover"
                }}
              />
            </div>
            <Form
              name="basic"
              labelCol={{
                span: 6
              }}
              wrapperCol={{
                span: 16
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                className="mb-1"
                label="Utilisateur"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre nom d’utilisateur!"
                  }
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
                    message: "Veuillez entrer votre mot de passe!"
                  }
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
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
