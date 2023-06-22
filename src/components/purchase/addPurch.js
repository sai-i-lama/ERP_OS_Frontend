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
	Typography,
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/actions/product/getAllProductAction";
import { addPurchase } from "../../redux/actions/purchase/addPurchaseAction";
import { loadSuppliers } from "../../redux/actions/supplier/getSuppliersAction";
import Products from "./Products";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadSupplier } from "../../redux/actions/supplier/detailSupplierAction";

const { Title } = Typography;

const AddPurch = () => {
	const { Option } = Select;
	const [formData, setFormData] = useState({});
	const [date, setDate] = useState(moment());
	const [afterDiscount, setAfterDiscount] = useState(0);
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();

	const onClickLoading = () => {
		setLoader(true);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadSuppliers({ page: 1, limit: 10 }));
	}, []);

	useEffect(() => {
		dispatch(loadProduct({ page: 1, limit: 10 }));
	}, []);

	const allSuppliers = useSelector((state) => state.suppliers.list);
	const allProducts = useSelector((state) => state.products.list);
	const [supplier, setSupplier] = useState(null);

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
		const purchaseInvoiceProduct = selectedProds.map((prod) => {
			return {
				product_id: prod.id,
				product_quantity: prod.selectedQty,
				product_purchase_price: prod.purchase_price,
			};
		});

		try {
			const valueData = {
				date: date,
				paid_amount: totalDiscountPaidDue.paid,
				discount: totalDiscountPaidDue.discount,
				supplier_id: supplier,
				purchaseInvoiceProduct,
			};

			const resp = await dispatch(addPurchase(valueData));

			if (resp.message === "success") {
				form.resetFields();
				setFormData({});
				setAfterDiscount(0);
				setLoader(false);
				navigate(`/purchase/${resp.createdInvoiceId}`);
			} else {
				setLoader(false);
			}
		} catch (error) {
			setLoader(false);
			console.log(error.message);
			toast.error("Errror while purchase");
		}
	};

	const updateFormData = (e) => {
		const data = form.getFieldsValue();

		const total = data.purchaseInvoiceProduct?.reduce((acc, p) => {
			const { product_quantity = 0, product_purchase_price = 0 } = p;
			acc += product_quantity * product_purchase_price;
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
	const onChange = () => {
		updateFormData();
	};

	const onSelectChange = async (value) => {
		updateFormData();
		const { data } = await dispatch(loadSupplier(value));
		setSupplier(data);
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

	const handleSelectedProdsPurchasePrice = (key, purchasePrice) => {
		const updatedSelectedProds = selectedProds.map((prod, index) => {
			let prodCopy;
			if (key === index) {
				prodCopy = { ...prod, purchase_price: purchasePrice };
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
				due,
			}));
		}
	}, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);

	return (
		<Card className='mt-3'>
			<Form
				form={form}
				className='m-lg-4'
				name='dynamic_form_nest_item'
				// onFinish={onFinish}
				onFinishFailed={() => {
					setLoader(false);
				}}
				// onChange={onChange}
				layout='vertical'
				size='large'
				autoComplete='off'>
				<Row className='mr-top' gutter={[24, 24]}>
					<Col span={24} className='border rounded column-design'>
						<Title level={4} className='m-2 text-center'>
							Purchase New Products
						</Title>
					</Col>
					<Col span={24} lg={16}>
						<div className='d-flex justify-content-between mb-1'>
							<Form.Item
								label='Supplier '
								name='supplier_id'
								style={{ maxWidth: "250px" }}
								rules={[
									{
										required: true,
										message: "Please Select a supplier!",
									},
								]}>
								<Select
									loading={!allSuppliers}
									showSearch
									placeholder='Select a supplier '
									optionFilterProp='children'
									onChange={(id) => setSupplier(id)}
									onSearch={onSearch}
									filterOption={(input, option) =>
										option.children.toLowerCase().includes(input.toLowerCase())
									}>
									{allSuppliers &&
										allSuppliers.map((sup) => (
											<Option key={sup.id} value={sup.id}>
												{sup.name}
											</Option>
										))}
								</Select>
							</Form.Item>
							<Form.Item label='Date' required>
								<DatePicker
									onChange={(value) => setDate(value._d)}
									defaultValue={date}
									format={"YYYY-MM-DD"}
									style={{ marginBottom: "10px", paddingTop: "10px" }}
									className='date-picker'
									label='date'
									name='date'
									rules={[
										{
											required: true,
											message: "Please input Date!",
										},
									]}
								/>
							</Form.Item>
						</div>
						<div className='d-flex justify-content-between mb-1'>
							<Form.Item name='supplier_memo_no' label='Supplier Memo'>
								<Input placeholder='Memo no ' onChange={updateFormData} />
							</Form.Item>

							<Form.Item name='note' label='note'>
								<Input placeholder='Note' onChange={updateFormData} />
							</Form.Item>
						</div>

						<Products
							formData={formData}
							setData={setFormData}
							allProducts={allProducts}
							// updateFormData={updateFormData}
							selectedProds={selectedProds}
							handleSelectedProds={handleSelectedProds}
							handleSelectedProdsQty={handleSelectedProdsQty}
							handleSelectedProdsPurchasePrice={
								handleSelectedProdsPurchasePrice
							}
							handleDeleteProd={handleDeleteProd}
						/>
					</Col>

					<Col span={24} lg={8}>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
							}}>
							<strong>Total: </strong>
							<strong>{totalDiscountPaidDue.total} tk</strong>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<div>
								<strong>Discount: </strong>
							</div>

							<Form.Item
								style={{ maxWidth: "200px" }}
								name='discount'
								rules={[
									{
										required: true,
										message: "Please input Discount!",
									},
								]}>
								<InputNumber type='number' onChange={handleDiscount} />
							</Form.Item>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
							}}>
							<div>
								<strong>After Discount: </strong>
							</div>
							<strong>{totalDiscountPaidDue.afterDiscount} tk</strong>
						</div>
						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<div>
								<strong>Paid Amount: </strong>
							</div>
							<Form.Item
								name='paid_amount'
								style={{ maxWidth: "200px" }}
								rules={[
									{
										required: true,
										message: "Please input Paid amount!",
									},
								]}>
								<InputNumber type='number' onChange={handlePaid} />
							</Form.Item>
						</div>

						<div
							style={{
								padding: "10px 20px",
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid #ccc",
								marginBottom: "10px",
							}}>
							<strong>Due Amount: </strong>
							<strong>{totalDiscountPaidDue.due} tk</strong>
						</div>

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
								Purchase Product
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default AddPurch;
