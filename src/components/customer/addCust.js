import { Button, Card, Col, Select, Form, Input, Row, Typography } from "antd";

import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/actions/customer/addCustomerAciton";
import UploadMany from "../Card/UploadMany";
import styles from "./AddCust.module.css";

const AddCust = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const TypeCustomer = ["Centre Thérapeutique", "Professionnel", "Particulier"];
  const Gender = ["Homme", "Femme"];
  const [sku, setSku] = useState("");
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
  };

  const [form] = Form.useForm();

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
    <Fragment>
      <Row className="mr-top" justify="space-between" gutter={[0, 30]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          className="rounded column-design"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Ajouter un client
            </Title>
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

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="téléphone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le numéro de téléphone du client!"
                  }
                ]}
              >
                <Input maxLength={14} pattern="[0-9]{1,14}" />
              </Form.Item>

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

              <Form.Item
                style={{ marginBottom: "10px" }}
                name="role"
                label="Type de Client "
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner le type de client!"
                  }
                ]}
              >
                <Select
                  name="role"
                  //loading={!category}
                  showSearch
                  placeholder="Sélectionnez le type de client"
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
                  {TypeCustomer &&
                    TypeCustomer.map((custom) => (
                      <Select.Option key={custom} value={custom}>
                        {custom}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              {/* Customer due droped */}

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addCustomerBtnContainer}
              >
                <Button
                  loading={loading}
                  onClick={onClick}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                >
                  Ajouter un client
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={11}
          xl={11}
          style={{ height: "250px" }}
          className="column-design rounded"
        >
          <Card bordered={false} className={styles.importCsvCard}>
            <Title level={4} className="m-2 text-center">
              Importer à partir d’un fichier CSV
            </Title>
            <UploadMany urlPath={"customer"} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddCust;
