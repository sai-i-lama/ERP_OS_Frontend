import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Input,
  Modal,
  Select,
  Typography
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../../redux/actions/customer/addCustomerAciton";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import Products from "./Products";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./pos.css";

const { Title } = Typography;

const AddPos = ({
  selectedProds,
  handleSelectedProdsQty,
  handleDeleteProd,
  handleSelectedProdsUnitPrice
}) => {
  const currentUserId = parseInt(localStorage.getItem("id"));

  const userRole = localStorage.getItem("role");

  const isProfessional = userRole === "Professionnel";
  const isParticulier = userRole === "Particulier";

  const currentRole = isProfessional
    ? "Professionnel"
    : isParticulier
    ? "Particulier"
    : null;

  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const TypeCustomer = ["Centre Thérapeutique", "Professionnel", "Particulier"];
  const Gender = ["Homme", "Femme"];

  const onClickLoading = () => {
    setLoader(true);
  };

  const [date, setDate] = useState(moment());
  const [afterDiscount, setAfterDiscount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCustomer({ page: 1, limit: 1000000 }));
  }, [dispatch]);

  const allCustomer = useSelector((state) => state.customers.list);
  const allProducts = useSelector((state) => state.products.list);
  const [customer, setCustomer] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState(""); // Nom du client sélectionné
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
    total: 0,
    discount: 0,
    afterDiscount: 0,
    given: 0,
    paid: 0,
    refunded: 0,
    due: 0
  });

  const handleDiscount = (discountAmount) => {
    const afterDiscount = totalDiscountPaidDue.total - discountAmount;
    let dueAmount = afterDiscount - totalDiscountPaidDue.paid;
    setTotalDiscountPaidDue((prev) => ({
      ...prev,
      discount: discountAmount,
      due: Math.max(dueAmount, 0), // Empêche les valeurs négatives pour due_amount
      afterDiscount
    }));
  };

  const handleGivenAmount = (givenAmount) => {
    let paidAmount = Math.min(givenAmount, totalDiscountPaidDue.afterDiscount); // Ne peut pas payer plus que le total après remise
    let amountRefunded = Math.max(
      givenAmount - totalDiscountPaidDue.afterDiscount,
      0
    ); // Calcul du montant à rembourser s'il y a un excédent
    let dueAmount = Math.max(
      totalDiscountPaidDue.afterDiscount - givenAmount,
      0
    ); // Si le montant donné est inférieur, il reste un due_amount

    setTotalDiscountPaidDue((prev) => ({
      ...prev,
      given: givenAmount,
      paid: paidAmount,
      refunded: amountRefunded,
      due: dueAmount
    }));
  };

  const [form] = Form.useForm();
  const [clientForm] = Form.useForm();

  const handleGenerateNumCom = () => {
    const generatedNumCom = Math.floor(Math.random() * 9000) + 1000;
    const customerName =
      allCustomer.find((cust) => cust.id === customer)?.username || "";
    if (customerName) {
      return `saï-com-${customerName}-${generatedNumCom}`;
    } else {
      toast.warn(
        "Veuillez sélectionner un client avant de générer le numéro de commande!"
      );
      return "";
    }
  };

  useEffect(() => {
    console.log("currentRole:", currentRole);
    console.log("currentUserId:", currentUserId);
    console.log("allCustomer:", allCustomer);
    if (currentRole && allCustomer) {
      const customer = allCustomer.find(
        (cust) => cust.role === currentRole && cust.id === currentUserId
      );
      if (customer) {
        console.log("Found customer:", customer);
        setCustomer(currentUserId);
        setSelectedCustomerName(customer.username);
      }
    }
  }, [currentRole, currentUserId, allCustomer]);

  const onFormSubmit = async (values) => {
    const generatedNumCom1 = handleGenerateNumCom();

    if (generatedNumCom1) {
      const saleInvoiceProduct = selectedProds.map((prod) => ({
        product_id: prod.id,
        product_quantity: prod.selectedQty,
        product_sale_price: prod.sale_price
      }));

      const valueData = {
        date: date.toISOString(),
        given_amount: totalDiscountPaidDue.given,
        paid_amount:totalDiscountPaidDue.paid,
        discount: totalDiscountPaidDue.discount,
        customer_id: customer, // Assurez-vous que customer est défini
        creatorId: currentUserId,
        type_saleInvoice: "produit_fini",
        numCommande: generatedNumCom1,
        saleInvoiceProduct
      };

      console.log("Données envoyées au backend:", valueData);

      try {
        const resp = await dispatch(addSale(valueData));

        if (resp.message === "success") {
          form.resetFields();
          setFormData({});
          setAfterDiscount(0);
          setLoader(false);
          toast.success("Votre Commande a été prise en compte");
          navigate(`/sale/${resp.createdInvoiceId}`);
        } else {
          setLoader(false);
        }
      } catch (error) {
        console.log("Erreur lors de la vente:", error.message);
        setLoader(false);
        toast.error("Erreur lors de la vente");
      }
    }
  };

  const handleCustomerData = (customerId) => {
    const selectedCustomer = allCustomer.find((cust) => cust.id === customerId);
    if (selectedCustomer) {
      setCustomer(customerId);
      setSelectedCustomerName(selectedCustomer.username);
      console.log("Selected customer in handleCustomerData:", selectedCustomer);
    }
  };

  const onSearch = (value) => {};

  useEffect(() => {
    if (selectedProds.length > 0) {
      let total = 0;
      selectedProds.forEach((prod) => {
        total += prod.sale_price * prod.selectedQty;
      });

      let afterDiscount = total - totalDiscountPaidDue.discount;
      let due = afterDiscount - totalDiscountPaidDue.paid;

      setTotalDiscountPaidDue((prev) => ({
        ...prev,
        total,
        afterDiscount,
        due: Math.max(due, 0)
      }));
    }
  }, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGenerateSku = () => {
    const generatedSku = Math.floor(Math.random() * 900000000) + 100000000;
    const customerName = clientForm.getFieldValue("username");
    if (customerName) {
      const customerNameAbbrev = customerName.slice(0, 3).toUpperCase();
      return `CLI-${customerNameAbbrev}-${generatedSku.toString()}`;
    } else {
      console.log("Veuillez saisir un nom avant de générer le SKU !");
      return null; // On retourne null si le nom du client n'est pas encore renseigné.
    }
  };

  const handleClientFormSubmit = async (values) => {
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
        clientForm.resetFields();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };


  console.log("cust", customer);
  return (
    <Card className="mt-3">
      <Form
        form={form}
        className="m-lg-1"
        name="dynamic_form_nest_item"
        layout="vertical"
        size="large"
        autoComplete="off"
        onFinish={onFormSubmit} // Utilisez onFinish pour soumettre le formulaire
      >
        {!currentRole ? (
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid #ccc"
                }}
              >
                <strong>Total: </strong>
                <strong>{totalDiscountPaidDue.total} cfa</strong>
              </div>

              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <strong>Remise: </strong>
                <Form.Item
                  name="discount"
                  rules={[
                    {
                      required: false,
                      message: "S’il vous plaît entrer le montant de la Remise!"
                    }
                  ]}
                >
                  <InputNumber
                    type="number"
                    defaultValue={0}
                    value={0}
                    min={0}
                    max={totalDiscountPaidDue.total}
                    onChange={(value) => {
                      handleDiscount(Math.max(value, 0));
                      if (value > totalDiscountPaidDue.total) {
                        setIsDisabled(true);
                      }
                    }}
                    disabled={isDisabled}
                  />
                </Form.Item>
              </div>

              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <strong>Après remise: </strong>
                <strong>{totalDiscountPaidDue.afterDiscount} cfa</strong>
              </div>

              {/* <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <strong>Montant payé: </strong>
                <Form.Item
                  name="paid_amount"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir le montant payé!"
                    }
                  ]}
                  initialValue={0}
                >
                  <InputNumber type="number" onChange={handleGivenAmount} min={0} />
                </Form.Item>
              </div> */}

              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <strong>Montant donné: </strong>
                <Form.Item
                  name="given_amount"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir le montant donné!"
                    }
                  ]}
                  initialValue={0}
                >
                  <InputNumber
                    type="number"
                    onChange={handleGivenAmount}
                    min={0}
                  />
                </Form.Item>
              </div>

              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <strong>Montant à rembourser: </strong>
                <strong>{totalDiscountPaidDue.refunded} cfa</strong>
              </div>

              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid #ccc"
                }}
              >
                <strong>Reste à payer: </strong>
                <strong>{totalDiscountPaidDue.due} cfa</strong>
              </div>
            </Col>

            <Col span={24}>
              <div className="d-flex justify-content-between mb-1">
                <div className="w-50">
                  <Form.Item
                    label="Client"
                    name="customer_id"
                    style={{ maxWidth: "250px" }}
                    rules={[
                      {
                        required: true,
                        message: "Veuillez sélectionner un client!"
                      }
                    ]}
                  >
                    <Select
                      loading={!allCustomer}
                      showSearch
                      placeholder="Sélectionner un client "
                      optionFilterProp="children"
                      onChange={handleCustomerData}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {allCustomer &&
                        allCustomer
                          .filter(
                            (cust) =>
                              cust.role === "Professionnel" ||
                              cust.role === "Particulier"
                          )
                          .map((cust) => (
                            <Option key={cust.id} value={cust.id}>
                              {cust.phone} - {cust.username}
                            </Option>
                          ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="w-50">
                  <Form.Item label="Date" required>
                    <DatePicker
                      onChange={(value) => setDate(value._d)}
                      defaultValue={moment()}
                      style={{ maxWidth: "250px" }}
                      label="date"
                      name="date"
                      disabled
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir la date!"
                        }
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>

              <Products
                formData={formData}
                setData={setFormData}
                allProducts={allProducts}
                selectedProds={selectedProds}
                handleSelectedProdsQty={handleSelectedProdsQty}
                handleSelectedProdsUnitPrice={handleSelectedProdsUnitPrice}
                handleDeleteProd={handleDeleteProd}
              />
            </Col>

            <Col span={24}>
              <Form.Item style={{ marginTop: "15px" }}>
                <div className="space">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    loading={loader}
                    onClick={() => {
                      onClickLoading();
                    }}
                  >
                    Vendre les produits
                  </Button>

                  <Button
                    block
                    type="primary"
                    onClick={() => {
                      setIsModalVisible(true);
                    }}
                  >
                    Ajouter un Client
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid #ccc"
                }}
              >
                <strong>Montant à payer: </strong>
                <strong>{totalDiscountPaidDue.due} cfa</strong>
              </div>
            </Col>
            <Col span={24}>
              <div className="d-flex justify-content-between mb-1">
                <div className="w-50">
                  <Form.Item
                    label="Client"
                    style={{ maxWidth: "250px" }}
                    rules={[
                      {
                        required: true,
                        message: "Veuillez sélectionner un client!"
                      }
                    ]}
                  >
                    <Input
                      value={selectedCustomerName || "Chargement..."}
                      readOnly
                      style={{ maxWidth: "250px" }}
                    />
                  </Form.Item>
                </div>

                <div className="w-50">
                  <Form.Item label="Date" required>
                    <DatePicker
                      onChange={(value) => setDate(value._d)}
                      defaultValue={moment()}
                      style={{ marginBottom: "10px" }}
                      label="date"
                      name="date"
                      disabled
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir la date!"
                        }
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>

              <Products
                formData={formData}
                setData={setFormData}
                allProducts={allProducts}
                selectedProds={selectedProds}
                handleSelectedProdsQty={handleSelectedProdsQty}
                handleSelectedProdsUnitPrice={handleSelectedProdsUnitPrice}
                handleDeleteProd={handleDeleteProd}
              />
            </Col>
            <Col span={24}>
              <Form.Item style={{ marginTop: "15px" }}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  onClick={() => {
                    onClickLoading();
                  }}
                >
                  Commander
                </Button>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>

      <Modal
        title="Ajouter un Client"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              clientForm.submit();
            }}
          >
            Ajouter
          </Button>
        ]}
      >
        <Form
          form={clientForm}
          layout="vertical"
          onFinish={handleClientFormSubmit}
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
              filterOption={(input, option) => option.children.includes(input)}
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
              filterOption={(input, option) => option.children.includes(input)}
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
        </Form>
      </Modal>
    </Card>
  );
};

export default AddPos;
