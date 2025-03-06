import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
  DatePicker
} from "antd";
import { toast } from "react-toastify";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/product/addProductAction";
import { loadAllProductCategory } from "../../redux/actions/productCategory/getProductCategoryAction";
import { loadSuppliers } from "../../redux/actions/supplier/getSuppliersAction";
import UploadMany from "../Card/UploadMany";
import styles from "./AddProd.module.css";

const AddProd = () => {
  const unitType = ["kg", "ltr", "g", "paquet", "sac"];
  const category = useSelector((state) => state.productCategories?.list);
  const allSuppliers = useSelector((state) => state.suppliers.list);
  const dispatch = useDispatch();
  //useEffect for loading category list from redux
  useEffect(() => {
    dispatch(loadAllProductCategory({ page: 1, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadSuppliers({ page: 1, limit: 10 }));
  }, []);

  const { Title } = Typography;
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [sku, setSku] = useState("");

  const [form] = Form.useForm();

  const TypeProduc = "Produit fini";
  useEffect(() => {
    form.setFieldsValue({
      type_product: TypeProduc
    });
  }, [form]);

  // Fonction pour générer le SKU
  const handleGenerateSku = () => {
    const generatedSku = Math.floor(Math.random() * 900000000) + 100000000;
    const productName = form.getFieldValue("name");
    if (productName) {
      const productNameAbbrev = productName.slice(0, 3).toUpperCase();
      const fullSku = `SAI-${productNameAbbrev}${generatedSku.toString()}`;
      setSku(fullSku); // Mettre à jour l'état du SKU
      return fullSku; // Retourner le SKU généré
    } else {
      toast.warn("Veuillez sélectionner un nom avant de générer le SKU!");
      return null; // Retourner null si le nom n'est pas disponible
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

      let formData = new FormData();
      formData.append("image", fileList[0].originFileObj);
      formData.append("name", values.name);
      formData.append("quantity", values.quantity);
      formData.append("volume", values.volume);
      formData.append("purchase_price", values.purchase_price);
      formData.append("sale_price", values.sale_price);
      formData.append("product_category_id", values.product_category_id);
      formData.append("idSupplier", values.idSupplier);
      formData.append("sku", generatedSku); // Utiliser le SKU généré
      formData.append("unit_type", values.unit_type);
      formData.append("type_product", values.type_product);
      formData.append("reorder_quantity", values.reorder_quantity);
      formData.append("unit_measurement", values.unit_measurement);
      formData.append("expirationDate", values.expirationDate);
      formData.append("productionDate", values.productionDate);

      const resp = await dispatch(addProduct(formData));

      if (resp.message === "success") {
        form.resetFields();
        setFileList([]);
        setLoader(false);
        setSku(""); // reset generated sku
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("érreur de création");
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("les champs comportant * doivent être remplis");
    console.log("Failed:", errorInfo);
  };

  const handelChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onClickLoading = () => {
    setLoader(true);
  };

  // console.log("supplier list[ " + allSuppliers + " ]");
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
              Ajouter un Produit
            </Title>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 7
              }}
              labelWrap
              wrapperCol={{
                span: 16
              }}
              initialValues={{
                remember: true,
                type_product: TypeProduc
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Nom"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le nom du produit!"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                name="type_product"
                label="Type de Produit "
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner le type de produit!"
                  }
                ]}
              >
                <Input readOnly disabled />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                name="idSupplier"
                label="Sélectionner un fournisseur "
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner le fournisseur!"
                  }
                ]}
              >
                <Select
                  loading={!allSuppliers}
                  showSearch
                  placeholder="Sélectionner un fournisseur "
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {allSuppliers &&
                    allSuppliers.map((sup) => (
                      <Select.Option key={sup.id} value={sup.id}>
                        {sup.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                name="product_category_id"
                label="Sélectionner une catégorie "
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner la catégorie!"
                  }
                ]}
              >
                <Select
                  name="product_category_id"
                  loading={!category}
                  showSearch
                  placeholder="Sélectionner une catégorie"
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
                  {category &&
                    category.map((cate) => (
                      <Select.Option key={cate.id} value={cate.id}>
                        {cate.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                name="unit_type"
                label="Sélectionnez le type d’unité "
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner le type d’unité!"
                  }
                ]}
              >
                <Select
                  name="unit_type"
                  loading={!category}
                  showSearch
                  placeholder="Sélectionnez le type d’unité"
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
                  {unitType &&
                    unitType.map((unit) => (
                      <Select.Option key={unit} value={unit}>
                        {unit}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Format"
                name="unit_measurement"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le Format!"
                  }
                ]}
              >
                {/* <Input type="number" min={0} /> */}
                <InputNumber
                   style={{ width: "100%" }}
                    min={0}
                    step={0.01} // Permet d'entrer des valeurs décimales
                    stringMode // Permet de stocker des nombres précis en tant que chaînes
                    
                 />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Quantité commandée"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir la Quantité!"
                  }
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                label="coût de production par unité"
                name="purchase_price"
                rules={[
                  {
                    required: true,
                    message: " Veuillez saisir le Prix d’achat!"
                  }
                ]}
              >
                <Input type="number" min={0} value={0} />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                label="Prix de vente"
                name="sale_price"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le Prix de vente!"
                  }
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>

              <Form.Item
                label="Envoyer image"
                valuePropName="image"
                rules={[
                  {
                    required: true,
                    message: "Veuillez selectioner une image"
                  }
                ]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  name="image"
                  fileList={fileList}
                  maxCount={1}
                  onChange={handelChange}
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8
                      }}
                    >
                      Envoyer
                    </div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Date de Production"
                name="productionDate"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir la Date de Production!"
                  }
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label="Date d'expiration"
                name="expirationDate"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir la Date d'expiration!"
                  }
                ]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "15px" }}
                className={styles.addProductBtnContainer}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={loader}
                  onClick={onClickLoading}
                >
                  Ajouter un produit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} className=" rounded">
          <Card className={`${styles.importCsvCard} column-design`}>
            <Title level={4} className="m-2 text-center">
              Importer à partir d’un fichier CSV
            </Title>
            <UploadMany urlPath={"product"} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddProd;
