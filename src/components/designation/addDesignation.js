import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { addDesignation } from "../../redux/actions/designation/addDesignationAciton";
import UploadMany from "../Card/UploadMany";
import styles from "./AddDesignation.module.css";

const AddDesignation = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [loader, setLoader] = useState(false);
  const onClickLoading = () => {
    setLoader(true);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addDesignation(values));
      if (resp === "success") {
        setLoader(false);
        form.resetFields();
      }
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Row className="mr-top" justify="space-between" gutter={[0, 30]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          className="rounded column-design"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
            Ajouter une Fonction
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 7,
              }}
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
                label="Nom"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le nom de la désignation!",
                  },
                ]}
              >
                <Input maxLength={50}/>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                className={styles.addDesignationBtnContainer}
              >
                <Button
                  onClick={onClickLoading}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                >
                  Ajouter une Fonction
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} className="rounded column-design">
          <Card bordered={false} className={styles.importCsvCard}>
            <Title level={4} className="m-2 text-center">
            Importer à partir d’un fichier CSV
            </Title>
            <UploadMany urlPath={"designation"} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddDesignation;
