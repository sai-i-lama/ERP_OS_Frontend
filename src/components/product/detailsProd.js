import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Image,
  Popover,
  Row,
  Form,
  Input,
  Modal,
  Table,
  Typography,
  DatePicker
} from "antd";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Navigate,
  useNavigate,
  useLocation,
  useParams
} from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct } from "../../redux/actions/product/deleteProductAction";
import { loadSingleProduct } from "../../redux/actions/product/detailProductAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

const DetailsProd = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  // State to handle total quantity
  const [totalQuantity, setTotalQuantity] = useState(0);

  // dispatch
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, [dispatch, id]);

  const columns = [
    {
      title: "Code du lot",
      dataIndex: "sku",
      key: "sku"
    },
    {
      title: "Quantité Initiale",
      dataIndex: "initialQuantity",
      key: "initialQuantity"
    },
    {
      title: "Quantité en Stock",
      dataIndex: "quantityInStock",
      key: "quantityInStock"
    },
    {
      title: "Date de production",
      dataIndex: "productionDate",
      key: "productionDate"
    },
    {
      title: "Date d'expiration",
      dataIndex: "expirationDate",
      key: "expirationDate"
    }
  ];

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name || "",
        quantity: product.quantity || 0,
        purchase_price: product.purchase_price || 0,
        sale_price: product.sale_price || 0,
        added_quantity: 0
      });
      setTotalQuantity(product.quantity || 0); // Set initial total quantity
    }
  }, [product, form]);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const updateProduct = async (id, values) => {
    try {
      await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        url: `product/${id}`,
        data: {
          ...values,
          quantity: totalQuantity // Send the total quantity to the API
        }
      });
      return "success";
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinish = (values) => {
    try {
      updateProduct(id, values);
      setModalVisible(false);
      toast.success("Les détails du produit sont mis à jour");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Function to handle quantity changes
  const handleQuantityChange = (value) => {
    setTotalQuantity(product.quantity + parseInt(value || 0)); // Update total quantity
  };

  //Delete Product
  const onDelete = () => {
    try {
      dispatch(deleteProduct(id));
      setVisible(false);
      toast.warning(`Le Produit : ${product.name} est supprimé`);
      return navigate("/product");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete Product PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Retour" subtitle={`${product?.name}`} />

      <div className="mr-top">
        {product ? (
          <Fragment key={product.id}>
            <Card bordered={false} className="card-custom">
              <div className="card-header d-flex justify-content-between m-3">
                <h5>
                  <i className="bi bi-person-lines-fill"></i>
                  <span className="mr-left">
                    ID : {product.id} | {product.name}
                  </span>
                </h5>
                <div className="col-md-6 text-end">
                  <Link
                    className="m-2"
                    to={`/product/${product.id}/update`}
                    state={{ data: product }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}
                    >
                      Renommer
                    </Button>
                  </Link>
                  <Popover
                    className="m-2"
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Oui !
                        </Button>
                      </a>
                    }
                    title="Voulez-vous vraiment supprimer ?"
                    trigger="click"
                    open={visible}
                    onOpenChange={handleVisibleChange}
                  >
                    <Button
                      type="danger"
                      shape="round"
                      icon={<DeleteOutlined />}
                    >
                      Supprimer
                    </Button>
                  </Popover>
                  <Button
                    className=""
                    block
                    type="primary"
                    onClick={() => {
                      setModalVisible(true);
                    }}
                  >
                    Ajouter la quantité du produit
                  </Button>
                </div>
              </div>
              <Row className="d-flex justify-content-between">
                <Col xs={24} xl={8}>
                  <table>
                    <thead>
                      <b>
                        <h3>Informations sur le produit :</h3>
                      </b>
                    </thead>
                    <tbody>
                      <div className="card-body ms-3">
                        <tr>
                          <td>
                            <p>
                              <Typography.Text strong>
                                Quantité actuelle :
                              </Typography.Text>{" "}
                            </p>
                          </td>
                          <td>
                            <p>{product.quantity}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <Typography.Text strong>
                                Prix d’achat :
                              </Typography.Text>{" "}
                            </p>
                          </td>
                          <td>
                            <p>{product.purchase_price}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <Typography.Text strong>
                                Prix de vente :
                              </Typography.Text>{" "}
                            </p>
                          </td>
                          <td>
                            <p>{product.sale_price}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              <Typography.Text strong>
                                Type d’unité :
                              </Typography.Text>{" "}
                            </p>
                          </td>
                          <td>
                            <p>{product.unit_type}</p>
                          </td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                </Col>
                <Col xs={24} xl={8}>
                  <div className="card-body ms-3">
                    <Image
                      width={300}
                      className="fluid"
                      src={product.imageUrl}
                    />
                  </div>
                </Col>
              </Row>
              
              {/* Tableau des lots */}
              <Card
                className="header-solid h-full"
                bordered={false}
                title={[
                  <h5 className="font-semibold m-0 text-center">
                    Lots associés au produit
                  </h5>
                ]}
                bodyStyle={{ paddingTop: "0" }}
              >
                <Table
                  dataSource={product.Lots} // Utiliser les lots du produit
                  columns={columns} // Colonnes définies plus haut
                  rowKey="id" // Utiliser l'id du lot comme clé unique
                />
              </Card>
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
      <Modal
        title="Ajouter la quantité du produit"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Ajouter
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Nom"
            name="name"
            rules={[
              {
                required: true,
                message: "Veuillez saisir le nom du produit!"
              }
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Quantité actuelle"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Veuillez saisir la quantité du produit!"
              }
            ]}
          >
            <Input disabled type="number" value={totalQuantity} />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Quantité à ajouter"
            name="added_quantity"
            rules={[
              {
                required: true,
                message: "Veuillez saisir la quantité à ajouter!"
              }
            ]}
          >
            <Input
              type="number"
              min={0}
              onChange={(e) => handleQuantityChange(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Prix d'achat"
            name="purchase_price"
            rules={[
              {
                required: true,
                message: "Veuillez saisir le prix d'achat!"
              }
            ]}
          >
            <Input type="number" min={0} disabled />
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
            style={{ marginBottom: "10px" }}
            label="Prix de vente"
            name="sale_price"
            rules={[
              {
                required: true,
                message: "Veuillez saisir le prix de vente!"
              }
            ]}
          >
            <Input type="number" min={0} disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailsProd;
