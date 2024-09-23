import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  Typography
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import Products from "./ProductsMat";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title } = Typography;

const AddSaleMat = ({
  selectedProds,
  handleSelectedProdsQty,
  handleDeleteProd,
  handleSelectedProdsUnitPrice
}) => {
  const currentUserId = parseInt(localStorage.getItem("id"));
  const userRole = localStorage.getItem("role");
  const currentRole = userRole;

  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onClickLoading = () => {
    setLoader(true);
  };

  const [date, setDate] = useState(moment());
  const [afterDiscount, setAfterDiscount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCustomer({ page: 1, limit: 10 }));
  }, [dispatch]);

  const allCustomer = useSelector((state) => state.customers.list);
  const allProducts = useSelector((state) => state.products.list);
  const [customer, setCustomer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedCustomerName, setSelectedCustomerName] = useState(""); // Nom du client sélectionné
  const [formData, setFormData] = useState({});
  const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
    total: 0,
    discount: 0,
    afterDiscount: 0,
    given: 0,
    paid: 0,
    refunded: 0,
    due: 0
  });

  // const handleDiscount = (discountAmount) => {
  //   const afterDiscount = totalDiscountPaidDue.total - discountAmount;
  //   let dueAmount = totalDiscountPaidDue.total - discountAmount;
  //   if (totalDiscountPaidDue.paid > 0) {
  //     dueAmount = dueAmount - totalDiscountPaidDue.paid;
  //   }
  //   setTotalDiscountPaidDue((prev) => ({
  //     ...prev,
  //     discount: discountAmount,
  //     due: dueAmount,
  //     afterDiscount
  //   }));
  // };

  // const handlePaid = (paidAmount) => {
  //   const dueAmount = totalDiscountPaidDue.afterDiscount - paidAmount;
  //   setTotalDiscountPaidDue((prev) => ({
  //     ...prev,
  //     paid: paidAmount,
  //     due: dueAmount
  //   }));
  // };

  // Form Function
  const [form] = Form.useForm();

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

  const onFormSubmit = async (values) => {
    // Générez le numéro de commande
    const generatedNumCom1 = handleGenerateNumCom();

    if (generatedNumCom1) {
      // Créez les données de la facture de vente
      const saleInvoiceProduct = selectedProds.map((prod) => ({
        product_id: prod.id,
        product_quantity: prod.selectedQty,
        product_purchase_price: prod.purchase_price
      }));

      const valueData = {
        date: date.toISOString(),
        given_amount: totalDiscountPaidDue.total,
        paid_amount:totalDiscountPaidDue.total,
        discount: totalDiscountPaidDue.discount,
        customer_id: customer, // Assurez-vous que customer est défini
        creatorId: currentUserId,
        type_saleInvoice: "matière_première",
        numCommande: generatedNumCom1,
        saleInvoiceProduct
      };
      // Log des données envoyées pour débogage
      console.log("Données envoyées au backend:", valueData);

      try {
        const resp = await dispatch(addSale(valueData));
        if (resp.message === "success") {
          form.resetFields();
          setFormData({});
          setAfterDiscount(0);
          setLoader(false);
          toast.success("Matière Première déstockée ");
          // navigate(`/sale/${resp.createdInvoiceId}`);
        } else {
          setLoader(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoader(false);
        toast.error("Erreur lors de la vente");
      }
    }
  };

  const handleCustomerData = (customerId) => {
    const selectedCustomer = allCustomer.find((cust) => cust.id === customerId);
    if (selectedCustomer) {
      setCustomer(customerId);
      setSelectedCustomerName(selectedCustomer.username); // Stocker le nom du client
    }
  };

  const onSearch = (value) => {};

  useEffect(() => {
    if (selectedProds.length > 0) {
      let total = 0;
      let afterDiscount = 0;
      let due = 0;

      selectedProds.forEach((prod) => {
        total += prod.purchase_price * prod.selectedQty;
      });

      if (totalDiscountPaidDue.discount > 0) {
        afterDiscount = total - totalDiscountPaidDue.discount;
      } else afterDiscount = total;

      if (totalDiscountPaidDue.paid > 0) {
        due = afterDiscount - totalDiscountPaidDue.paid;
      } else due = afterDiscount;

      setTotalDiscountPaidDue((prev) => ({
        ...prev,
        total,
        afterDiscount,
        due
      }));
    }
  }, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);

  return (
    <Card className="mt-3">
      <Form
        form={form}
        className="m-lg-1"
        name="dynamic_form_nest_item"
        // onFinish={onFinish}
        // onChange={onChange}
        layout="vertical"
        size="large"
        autoComplete="off"
      >
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

            {/* <div
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

            <div
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
              >
                <InputNumber type="number" onChange={handlePaid} min={0} />
              </Form.Item>
            </div>
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
            </div> */}
          </Col>

          <Col span={24}>
            <div className="d-flex justify-content-between mb-1">
              <div className="w-50">
                <Form.Item
                  label="Client "
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
                        .filter((cust) => cust.role === "Centre Thérapeutique")
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
                    style={{ marginBottom: "10px" }}
                    label="date"
                    name="date"
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
              // updateFormData={updateFormData}
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
                  onFormSubmit();
                }}
              >
                Déstocker matière Première
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddSaleMat;
