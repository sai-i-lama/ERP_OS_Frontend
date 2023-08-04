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
import { toast } from "react-toastify";

import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addSupplierPayment } from "../../redux/actions/supplierPayment/addSupplierPaymentAction";
import PageTitle from "../page-header/PageHeader";

const AddSupPaymentByInvoice = () => {
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

			const resp = await dispatch(addSupplierPayment(data));
			if (resp == "success") {
				setLoader(false);
				navigate(-1);
			}
			toast.success("Paiement effectué avec succès");

			form.resetFields();
			setLoader(false);
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
			<PageTitle title='Retour' subtitle={"PAIEMENT FACTURE FOURNISSEUR"}/>
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
						Paiement de la facture d’achat
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
							<Form.Item label='Date' required>
								<DatePicker
									defaultValue={moment()}
									onChange={(value) => setDate(value?._d)}
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
							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Remise'
								name='discount'
								rules={[
									{
										required: true,
										message: "S’il vous plaît entrer le montant de la Remise!",
									},
								]}>
								<Input min={0} />
							</Form.Item>

							<Form.Item
								style={{ marginBottom: "10px" }}
								label='Montant'
								name='amount'
								rules={[
									{
										required: true,
										message: "Veuillez saisir le montant!",
									},
								]}>
								<Input type='number' min={0} />
							</Form.Item>

							<Form.Item
								hasFeedback
								validateStatus='success'
								initialValue={pid}
								style={{ marginBottom: "10px" }}
								label='N° Facture d’achat'
								name='purchase_invoice_no'
								rules={[
									{
										required: true,
										message: "Veuillez saisir le N° facture!",
									},
								]}>
								<Input type='number' disabled col="true" min={0}/>
							</Form.Item>
							{/* 
              <Form.Item
                style={{ marginBottom: "10px" }}
                label='Particulars'
                name='particulars'
                rules={[
                  {
                    required: true,
                    message: "Please input particulars!",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}

							<Form.Item
								style={{ marginBottom: "10px" }}
								wrapperCol={{
									offset: 8,
									span: 16,
								}}>
								<Button
									block
									type='primary'
									htmlType='submit'
									shape='round'
									loading={loader}
									onClick={() => setLoader(true)}>
									Payer maintenant
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default AddSupPaymentByInvoice;
