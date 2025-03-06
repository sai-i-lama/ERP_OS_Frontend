import { Button, Form, Input, Typography, Row, Col, Card } from "antd";
import React, { useState } from "react";
import axios from "axios";
import styles from "../user/Login.module.css";
import logo from "../../assets/images/sai-i-lama-logo.png";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoader(true); // Activer le loader pendant l'appel API
    try {
      // Envoyer l'adresse e-mail au backend pour générer et envoyer le lien de réinitialisation
      const response = await axios.post(
         "http://localhost:5001/v1/customer/sendTokenResetPassword",
        // "http://192.168.1.176:5001/v1/customer/sendTokenResetPassword"
        { email: values.email } // envoyer l'e-mail au backend
      );

      // Afficher un message de succès
      setMessage(response.data.message);
      setError("");
      toast.success("Lien de réinitialisation envoyé ! Veuillez Consulter votre adresse e-mail");
    } catch (err) {
      // Gérer les erreurs
      setError("Erreur lors de l'envoi du lien de réinitialisation.");
      setMessage("");
      toast.error("Erreur, cette adresse  e-mail n'existe pas.");
    } finally {
      setLoader(false); // Désactiver le loader après l'appel API
    }
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
              Réinitialiser le mot de passe
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
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              onFinish={handleSubmit}
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
                    type: "email", // Assurez-vous que c'est bien un email
                    message: "Veuillez entrer une adresse e-mail valide !"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item className={styles.submitBtnContainer}>
                <Button type="primary" htmlType="submit" loading={loader}>
                  Envoyer le lien de réinitialisation
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
