import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	InputNumber,
	Row,
	Select,
	Typography,
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import Products from "./Products";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";

const { Title } = Typography;

const AddSale = () => {
	const { Option } = Select;
	const [formData, setFormData] = useState({});
	const [loader, setLoader] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const navigate = useNavigate();

	const onClickLoading = () => {
		setLoader(true);
	};

	const [date, setDate] = useState(moment());
	const [afterDiscount, setAfterDiscount] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadAllCustomer({ page: 1, limit: 10 }));
	}, []);

	useEffect(() => {
		dispatch(loadProduct({ page: 1, limit: 10 }));
	}, []);

	const allCustomer = useSelector((state) => state.customers.list);
	const allProducts = useSelector((state) => state.products.list);
	const allStaff = useSelector((state) => state.users.list);

	useEffect(() => {
		dispatch(loadAllStaff({ status: "true" }));
	}, []);

	const [customer, setCustomer] = useState(null);
	const [salesPerson, setSalesPerson] = useState(null);

	// Form Function
	const [form] = Form.useForm();
	const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
		total: 0,
		discount: 0,
		afterDiscount: 0,
		paid: 0,
		due: 0,
	});

	const onFormSubmit = async (values) => {
		const saleInvoiceProduct = selectedProds.map((prod) => {
			return {
				product_id: prod.id,
				product_quantity: prod.selectedQty,
				product_sale_price: prod.sale_price,
			};
		});

		try {
			const valueData = {
				date: date,
				paid_amount: totalDiscountPaidDue.paid,
				discount: totalDiscountPaidDue.discount,
				customer_id: customer,
				user_id: salesPerson,
				saleInvoiceProduct,
			};
			const resp = await dispatch(addSale(valueData));

			if (resp.message === "success") {
				form.resetFields();
				setFormData({});
				setAfterDiscount(0);
				setLoader(false);
				dispatch(
					loadAllSale({
						page: 1,
						limit: "",
						startdate: moment().format("YYYY-MM-DD"),
						enddate: moment().format("YYYY-MM-DD"),
						user: "",
					})
				);
				navigate(`/sale/${resp.createdInvoiceId}`);
			} else {
				setLoader(false);
			}
		} catch (error) {
			console.log(error.message);
			setLoader(false);
			toast.error("Erreur lors de la vente");
		}
	};

	const updateFormData = () => {
		const data = form.getFieldsValue();

		const total = data.saleInvoiceProduct?.reduce((acc, p) => {
			const { product_quantity = 0, product_sale_price = 0 } = p;
			acc += product_quantity * product_sale_price;
			return acc;
		}, 0);

		data.total = total;
		data.due = total - (data.paid_amount ?? 0) - (data.discount ?? 0);

		setFormData(data);
		if (data.discount) {
			setAfterDiscount(total - (data.discount ?? 0));
		}
		if (data.discount == 0) {
			setAfterDiscount(0);
		}
	};

	// Select Supplier Funciton
	const onChange = async (values) => {
		updateFormData();
	};

	const onSearch = (value) => {};

	// Products Handlers

	const [selectedProds, setSelectedProds] = useState([]);

	const handleSelectedProds = (prodId, key) => {
		const foundProd = allProducts.find((item) => item.id === prodId);
		// if (foundProd === undefined) {
		let updatedSelectedProds = [...selectedProds];
		if (selectedProds[key]) {
			updatedSelectedProds[key] = { ...foundProd, selectedQty: 1 };
			setSelectedProds(updatedSelectedProds);
		} else {
			setSelectedProds((prev) => [...prev, { ...foundProd, selectedQty: 1 }]);
		}

		// }
	};

	const handleSelectedProdsQty = (key, qty) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, selectedQty: qty };
			} else prodCopy = { ...prod };

			return prodCopy;
		});

		setSelectedProds(updatedSelectedProds);
	};

	const handleSelectedProdsSalePrice = (key, salePrice) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, sale_price: salePrice };
			} else prodCopy = { ...prod };

			return prodCopy;
		});
		setSelectedProds(updatedSelectedProds);
	};

	const handleDeleteProd = (key) => {
		if (selectedProds[key]) {
			const updatedProds = selectedProds.filter((prod, index) => key !== index);
			setSelectedProds(updatedProds);
		}
	};

	const handleDiscount = (discountAmount) => {
		const afterDiscount = totalDiscountPaidDue.total - discountAmount;
		let dueAmount = totalDiscountPaidDue.total - discountAmount;
		if (totalDiscountPaidDue.paid > 0) {
			dueAmount = dueAmount - totalDiscountPaidDue.paid;
		}
		setTotalDiscountPaidDue((prev) => ({
			...prev,
			discount: discountAmount,
			due: dueAmount,
			afterDiscount,
		}));
	};

	const handlePaid = (paidAmount) => {
		const dueAmount = totalDiscountPaidDue.afterDiscount - paidAmount;
		setTotalDiscountPaidDue((prev) => ({
			...prev,
			paid: paidAmount,
			due: dueAmount,
		}));
	};

	useEffect(() => {
		if (selectedProds.length > 0) {
			let total = 0;
			let afterDiscount = 0;
			let due = 0;

			selectedProds.forEach((prod) => {
				total += prod.sale_price * prod.selectedQty;
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
				due,
			}));
		}
	}, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);

	return (
<Card className='mt-3'>
			<Form
				form={form}
				className='m-lg-1'
				name='dynamic_form_nest_item'
				// onFinish={onFinish}
				// onChange={onChange}
				layout='vertical'
				size='large'
				autoComplete='off'>
				<Row gutter={[24, 24]}>
					<Col span={24}>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
							}}>
							<strong>Total: </strong>
							<strong>{totalDiscountPaidDue.total} cfa</strong>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<strong>Remise: </strong>
							<Form.Item
								name='discount'
								rules={[
									{
										required: false,
										message: "S’il vous plaît entrer le montant de la Remise!",
									},
								]}>
								<InputNumber
									type='number'
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
								justifyContent: "space-between",
							}}>
							<strong>Après remise: </strong>
							<strong>{totalDiscountPaidDue.afterDiscount} cfa</strong>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<strong>Montant payé: </strong>
							<Form.Item
								name='paid_amount'
								rules={[
									{
										required: true,
										message: "Veuillez saisir le montant payé!",
									},
								]}>
								<InputNumber type='number' onChange={handlePaid} min={0} />
							</Form.Item>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
							}}>
							<strong>Montant à payer: </strong>
							<strong>{totalDiscountPaidDue.due} cfa</strong>
						</div>
					</Col>

					<Col span={24}>
						<div className='d-flex justify-content-between mb-1'>
							<div className='w-50'>
								<Form.Item
									label='Client '
									name='customer_id'
									style={{ maxWidth: "250px" }}
									rules={[
										{
											required: true,
											message: "Veuillez sélectionner un client!",
										},
									]}>
									<Select
										loading={!allCustomer}
										showSearch
										placeholder='Sélectionner un client '
										optionFilterProp='children'
										onChange={(id) => setCustomer(id)}
										onSearch={onSearch}
										filterOption={(input, option) =>
											option.children
												.toString()
												.toLowerCase()
												.includes(input.toLowerCase())
										}>
										{allCustomer &&
											allCustomer.map((cust) => (
												<Option key={cust.id} value={cust.id}>
													{cust.phone} - {cust.name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</div>

							<div className='w-50'>
								<Form.Item label='Date' required>
									<DatePicker
										onChange={(value) => setDate(value._d)}
										defaultValue={moment()}
										style={{ marginBottom: "10px" }}
										label='date'
										name='date'
										rules={[
											{
												required: true,
												message: "Veuillez saisir la date!",
											},
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
							handleSelectedProds={handleSelectedProds}
							handleSelectedProdsQty={handleSelectedProdsQty}
							handleSelectedProdsSalePrice={handleSelectedProdsSalePrice}
							handleDeleteProd={handleDeleteProd}
						/>
					</Col>
					<Col span={24}>
						<Form.Item style={{ marginTop: "15px" }}>
							<Button
								block
								type='primary'
								htmlType='submit'
								loading={loader}
								onClick={() => {
									onClickLoading();
									onFormSubmit();
								}}>
								Vente Produit
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default AddSale;
