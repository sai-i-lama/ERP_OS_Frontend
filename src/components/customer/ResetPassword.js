import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Form, Input, Button, Typography, Row, Col, Card } from "antd";
import { toast } from "react-toastify";
import styles from "../user/Login.module.css";
import logo from "../../assets/images/sai-i-lama-logo.png";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Récupérer le token depuis l'URL
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { newPassword, confirmPassword } = values;

    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoader(true); // Activer le loader pendant la requête

      // Envoyer le nouveau mot de passe avec le token au backend
      const response = await axios.post(
         "http://localhost:5001/v1/customer/createResetPassword",
        // "http://192.168.1.176:5001/v1/customer/createResetPassword",
        {
          token, // Vous devrez vous assurer que ce token est bien disponible
          newPassword
        }
      );

      // Vérifier si la réponse indique un succès
      if (response.data.message === "Mot de passe réinitialisé avec succès") {
        setLoader(false); // Désactiver le loader
        form.resetFields(); // Réinitialiser le formulaire
        navigate("/auth/login"); // Rediriger l'utilisateur vers la page de login
        toast.success("Mot de passe modifié avec succès !");
      } else {
        setLoader(false);
        setError("Erreur lors de la réinitialisation du mot de passe.");
      }
    } catch (error) {
      setLoader(false);
      console.log(error.message);
      setError("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("Erreur de soumission, veuillez réessayer");
  };

  return (
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
              style={{ width: "50%", height: "50%", objectFit: "cover" }}
            />
          </div>
          <Form
            form={form}
            name="reset_password"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="mb-1"
              label="Nouveau mot de passe"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer un nouveau mot de passe !"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className="mb-2"
              label="Confirmer mot de passe"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Veuillez confirmer le mot de passe !"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Les mots de passe ne correspondent pas")
                    );
                  }
                })
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
                Réinitialiser le mot de passe
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
