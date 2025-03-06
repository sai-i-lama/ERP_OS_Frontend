import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography
} from "antd";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/actions/designation/getDesignationAction";
import { addStaff } from "../../redux/actions/user/addStaffAciton";
import { getRoles } from "../role/roleApis";

const AddUser = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { Option } = Select;
  const [list, setList] = useState(null);
  const Gender = ["Homme", "Femme"];

  // const [j_date, setJ_date] = useState(moment());
  // const [l_date, setL_date] = useState(moment());

  // useseletor to get designations from redux
  const designation = useSelector((state) => state.designations?.list);

  useEffect(() => {
    getRoles()
      .then((d) => setList(d))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    dispatch(loadAllDesignation());
  }, []);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addStaff(values));
      setLoader(true);
      if (resp === "success") {
        setLoader(false);
      } else {
        setLoader(false);
      }

      form.resetFields();
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment bordered={false}>
      <Row className="mr-top">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={12}
          className="column-design border rounded bg-white"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center">
              Ajouter personnel
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 6
              }}
              wrapperCol={{
                span: 18
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
                label="Nom d’utilisateur"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le nom d’utilisateur!"
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
                    message: "Veuillez saisir votre mot de passe !"
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
                    message: "Veuillez saisir l'email!"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Date de début de fonction"
                name="join_date"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir la Date d’adhésion!"
                  }
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Date de fin de fonction"
                name="leave_date"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir la date de fin de fonction!"
                  }
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner le type!"
                  }
                ]}
                label="Role"
                name={"role"}
                style={{ marginBottom: "20px" }}
              >
                <Select
                  loading={!list}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  mode="single"
                  allowClear
                  style={{
                    width: "100%"
                  }}
                  placeholder="Veuillez sélectionner"
                >
                  {list &&
                    list.map((role) => (
                      <Option key={role.name}>{role.name}</Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Id No"
                name="id_no"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir id "
                  }
                ]}
              >
                <Input placeholder="OE-012" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="téléphone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le numéro de téléphone"
                  }
                ]}
              >
                <Input maxLength={14} pattern="[0-9]{1,14}" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Adresse"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir l'adresse"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Salaire"
                name="salary"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le montant du salaire"
                  }
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Groupe sanguin"
                name="blood_group"
                rules={[
                  {
                    required: true,
                    message: "Veuillez  le Groupe sanguin "
                  }
                ]}
              >
                <Input max={3} />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner la Fonction!"
                  }
                ]}
                label="Fonction"
                name={"designation_id"}
                style={{ marginBottom: "20px" }}
              >
                <Select
                  loading={!designation}
                  optionFilterProp="children"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  mode="single"
                  allowClear
                  style={{
                    width: "100%"
                  }}
                  placeholder="Veuillez sélectionner"
                >
                  {designation &&
                    designation.map((desg) => (
                      <Option key={desg.id}>{desg.name}</Option>
                    ))}
                </Select>
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
                wrapperCol={{
                  offset: 4,
                  span: 16
                }}
              >
                <Button
                  onClick={() => setLoader(true)}
                  block
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                >
                  Ajouter personnel
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddUser;
