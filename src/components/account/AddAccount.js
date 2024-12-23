import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./AddNewAccount.module.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../../redux/actions/account/addAccountAction";
import { getMainAccount } from "./account.api";

const AddAccoun = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const getAccounts = async () => {
      const response = await getMainAccount();
      setAccounts(response);
    };
    getAccounts();
  }, []);

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addAccount(values));
      if (resp === "success") {
        setLoader(false);
      }

      toast.success("Compte ajouté");
      form.resetFields();
      setLoader(false);
    } catch (error) {
      toast.error("Erreur lors de l'ajout du compte");
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoader(false);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <Row className="mr-top ">
        <Col xs={24} sm={24} md={24} lg={16} xl={12} className="border rounded column-design">
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Ajouter un compte
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 7,
              }}
              labelWrap
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                name="name"
                label="Nom"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le compte débiteur!",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  maxLength={40}
                  pattern="[a-zA-Z]+"
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                name="account_id"
                label="Type de compte"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le compte débiteur!",
                  },
                ]}
              >
                <Select
                  loading={!accounts}
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder="Sélectionnez le type de compte"
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
                  {accounts &&
                    accounts.map((acc) => (
                      <Select.Option key={acc.id} value={acc.id}>
                        {acc.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addNewAccountBtnContainer}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                  onClick={() => setLoader(true)}
                >
                  Ajouter un nouveau compte
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddAccoun;
