import {
  Button,
  Form,
  Select,
  Input,
  Typography,
  Row,
  Col,
  Card,
  Radio
} from "antd";
import { toast } from "react-toastify";
import { addCustomer } from "../../redux/actions/customer/addCustomerAciton";
import { useDispatch } from "react-redux";
import Main from "../layouts/Main";
import { Link, useNavigate } from "react-router-dom";
import styles from "../user/Login.module.css";
import { useState } from "react";
import logo from "../../assets/images/sai-i-lama-logo.png";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const navigate = useNavigate();
  const Gender = ["Homme", "Femme"];
  const [sku, setSku] = useState("");
  const [form] = Form.useForm();

  //   const onFinish = async (values) => {
  //     try {
  //       const resp = await dispatch(addStaff(values));
  //       setLoader(true);
  //       if (resp === "success") {
  //         setLoader(false);
  //         navigate("/auth/login");
  //       } else {
  //         setLoader(false);
  //       }

  //       form.resetFields();
  //     } catch (error) {
  //       console.log(error.message);
  //       setLoader(false);
  //     }
  //   };

  const handleGenerateSku = () => {
    const generatedSku = Math.floor(Math.random() * 900000000) + 100000000;
    const customerName = form.getFieldValue("username");
    if (customerName) {
      const customerNameAbbrev = customerName.slice(0, 3).toUpperCase();
      return `CLI-${customerNameAbbrev}-${generatedSku.toString()}`;
    } else {
      console.log("Veuillez saisir un nom avant de générer le SKU !");
      return null; // On retourne null si le nom du client n'est pas encore renseigné.
    }
  };

  const onFinish = async (values) => {
    try {
      // Générer le SKU
      const generatedSku = handleGenerateSku();

      if (!generatedSku) {
        // Si le SKU n'a pas pu être généré, arrêter l'exécution
        return;
      }

      // Ajouter le SKU aux valeurs envoyées
      values.sku = generatedSku;

      const resp = await dispatch(addCustomer(values));
      if (resp.message === "success") {
        setLoading(false);
        form.resetFields();
        navigate("/auth/login");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col span={24}>
        <Card bordered={true} className={styles.card1}>
          <Title level={3} className="m-3 text-center">
            BIENVENUE A SAI I LAMA
          </Title>
          <div className={styles.logoContainer}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: "30%", // Vous pouvez ajuster la taille du logo ici
                height: "30%",
                objectFit: "cover"
              }}
            />
          </div>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 7
            }}
            wrapperCol={{
              span: 16
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Nom"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir le nom du client!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="form-group col-md-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir l'adresse mail du client!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Mot de passe"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir le mot de passe du client !"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="form-group col-md-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="téléphone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message:
                        "Veuillez saisir le numéro de téléphone du client!"
                    }
                  ]}
                >
                  <Input maxLength={14} pattern="[0-9]{1,14}" />
                </Form.Item>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="adresse"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir l'adresse du client!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="form-group col-md-6">
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  name="gender"
                  label="Genre "
                  rules={[
                    {
                      required: true,
                      message: "Veuillez sélectionner votre genre!"
                    }
                  ]}
                >
                  <Select
                    name="gender"
                    //loading={!category}
                    showSearch
                    placeholder="Sélectionnez votre genre"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {Gender &&
                      Gender.map((custom) => (
                        <Select.Option key={custom} value={custom}>
                          {custom}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            {/* Customer due droped */}

            <Form.Item
              style={{ marginBottom: "10px" }}
              className={styles.submitBtnContainer}
            >
              <Button
                loading={loading}
                onClick={() => setLoading(true)}
                type="primary"
                htmlType="submit"
                shape="round"
              >
                S'inscrire
              </Button>
            </Form.Item>
            <h6 className="text-center mt-2">
              Vous avez déjà un compte ?{" "}
              <Link to={"/auth/login"}>Connectez-vous ici</Link>
            </h6>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
