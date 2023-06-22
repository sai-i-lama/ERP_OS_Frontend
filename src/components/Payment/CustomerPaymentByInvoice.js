import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Typography,
} from "antd";

import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import moment from "moment";
import { addCustomerPayment } from "../../redux/actions/customerPayment/addCustomerPaymentAction";
import PageTitle from "../page-header/PageHeader";
import { toast } from "react-toastify";

const AddCustPaymentByInvoice = () => {
	const navigate = useNavigate();

	const { pid } = useParams();

	const dispatch = useDispatch();
	const { Title } = Typography;

	const [form] = Form.useForm();

	let [date, setDate] = useState(moment());
	const [loader, setLoader] = useState(false);

	const onFinish = async (values) => {
		try {
			const data = {
				date: date,
				...values,
			};

			const resp = await dispatch(addCustomerPayment(data));

			if (resp == "success") {
				navigate(-1);
				setLoader(false);
				toast.success("Payment Added Successfully");
			}

			form.resetFields();
		} catch (error) {
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
		<>
			<PageTitle title={"Back"} />
			<Row className='mr-top'>
				<Col
					xs={24}
					sm={24}
					md={12}
					lg={12}
					xl={14}
					className='border rounded column-design'>
					<Card bordered={false} className='criclebox h-full'>
						<Title level={3} className='m-3 text-center'>
							Sale Invoice Payment
						</Title>
						<Form
							form={form}
							className='m-4'
							name='basic'
							labelCol={{
								span: 8,
							}}
							wrapperCol={{
								span: 16,
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete='off'>
							<Form.Item
								label='Date'
								rules={[
									{
										required: true,
										message: "Please input the date!",
									},
								]}>
								<DatePicker
									onChange={(value) => setDate(value?._d)}
									defaultValue={moment()}
									style={{ marginBottom: "10px" }}
									label='date'
									name='date'
									rules={[
										{
											required: true,
											message: "Please input Date",
										},
									]}
								/>
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Discount'
								name='discount'
								rules={[
									{
										required: true,
										message: "Please input Discount!",
									},
								]}>
								<Input />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Amount'
								name='amount'
								rules={[
									{
										required: true,
										message: "Please input amount!",
									},
								]}>
								<Input type='number' />
							</Form.Item>

							<Form.Item
								hasFeedback
								validateStatus='success'
								initialValue={pid}
								style={{ marginBottom: "10px" }}
								label='Sale Invoice No'
								name='sale_invoice_no'
								rules={[
									{
										required: true,
										message: "Please input Invoice No!",
									},
								]}>
								<Input type='number' disabled col />
							</Form.Item>

							{/* <Form.Item
								style={{ marginBottom: "10px" }}
								label='Particulars'
								name='particulars'
								rules={[
									{
										required: true,
										message: "Please input particulars!",
									},
								]}>
								<Input />
							</Form.Item> */}

							<Form.Item
								style={{ marginBottom: "10px" }}
								wrapperCol={{
									offset: 8,
									span: 16,
								}}>
								<Button
									onClick={() => setLoader(true)}
									block
									type='primary'
									htmlType='submit'
									shape='round'
									loading={loader}>
									Pay Now
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default AddCustPaymentByInvoice;
