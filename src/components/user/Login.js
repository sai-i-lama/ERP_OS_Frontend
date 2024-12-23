import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/user/loginUserAction";
import logo from "../../assets/images/sai-i-lama-logo.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const userRole = localStorage.getItem("role");

    if (isLogged) {
      // Redirection basée sur le rôle de l'utilisateur
      if (userRole === "Professionnel" || userRole === "Particulier") {
        window.location.href = "/pos";
      } else {
        window.location.href = "/dashboard";
      }
    }
  }, []);

  const onFinish = async (values) => {
    setLoader(true);

    // Préparer les valeurs de connexion
    const loginValues = {
      email: values.email,
      password: values.password
    };

    console.log("Login Values:", loginValues); // Ajoutez ce log pour vérifier les valeurs envoyées

    const resp = await dispatch(addUser(loginValues));

    if (resp === "success") {
      const userRole = localStorage.getItem("role");

      // Redirection basée sur le rôle de l'utilisateur
      if (userRole === "Professionnel" || userRole === "Particulier") {
        window.location.href = "/pos";
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      toast.error("Email ou mot de passe incorrect !");
    }
    setLoader(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
    toast.error("Erreur de connexion, veuillez réessayer");
  };

  return (
    <>
      <Row className="card-row">
        <Col span={24}>
          <Card bordered={true} className={styles.card}>
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
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                className="mb-1"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer votre email !"
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
                    message: "Veuillez entrer votre mot de passe !"
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
                  Se Connecter
                </Button>
              </Form.Item>
              <h6 className="text-center mt-2">
                Vous avez déjà un compte ?{" "}
                <Link to={"/register"}>Inscrivez-vous ici</Link>
              </h6>
              <h6 className="text-center mt-2">
                Mot de passe oublié ?{" "}
                <Link to={"/forgot-password"}>cliquez ici</Link>
              </h6>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
