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
  Typography
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
  const [Modalvisible, setModalVisible] = useState(false);

  //dispatch
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name || "",
        quantity: product.quantity || 0,
        purchase_price: product.purchase_price || 0,
        sale_price: product.sale_price || 0
      });
    }
  }, [product, form]);

  const [success, setSuccess] = useState(false);

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
          ...values
        }
      });
      return "success";
      // return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const onFinish = (values) => {
    try {
      updateProduct(id, values);
      setSuccess(true);
      setModalVisible(false)
      toast.success("Les détails du produit sont mis à jour");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(deleteProduct(id));

      setVisible(false);
      toast.warning(`le Produit : ${product.name} est supprimé `);
      return navigate("/product");
    } catch (error) {
      console.log(error.message);
    }
  };
  // Delete Supplier PopUp
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
      <PageTitle title=" Retour" subtitle={`${product?.name}`} />

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
                        <h3> Informations sur le produit :</h3>
                      </b>
                    </thead>
                    <tbody>
                      <div className="card-body ms-3">
                        <tr>
                          <td>
                            <p>
                              <Typography.Text strong>
                                Quantité :
                              </Typography.Text>{" "}
                            </p>
                          </td>
                          <td>
                            <p> {product.quantity}</p>
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
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
      <Modal
        title="Ajouter un Client"
        visible={Modalvisible}
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
          initialValues={{
            name: product?.name || "",
            quantity: product?.quantity || 0,
            purchase_price: product?.purchase_price || 0,
            sale_price: product?.sale_price || 0
          }}
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
            <Input disabled/>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Quantité"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Veuillez saisir la Quantité du produit!"
              }
            ]}
          >
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Prix d’achat"
            name="purchase_price"
            rules={[
              {
                required: true,
                message: " Veuillez saisir Prix d’achat !"
              }
            ]}
          >
            <Input type="number" min={0} disabled/>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Prix de vente"
            name="sale_price"
            rules={[
              {
                required: true,
                message: "Veuillez saisir le Prix de vente!"
              }
            ]}
          >
            <Input type="number" min={0} disabled/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailsProd;
