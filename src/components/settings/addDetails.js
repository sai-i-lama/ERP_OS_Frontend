import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { toast } from "react-toastify";
import getSetting from "../../api/getSettings";

import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Loader from "../loader/loader";
import styles from "./AddDetails.module.css";

//Update Invoice API REQ

const updateInvoice = async (values) => {
	try {
		await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `setting`,
			data: {
				...values,
			},
		});
		return "success";
		// return data;
	} catch (error) {
		console.log(error.message);
	}
};

const AddDetails = () => {
	const { Title } = Typography;
	const [loader, setLoader] = useState(false);

	const [form] = Form.useForm();

	const [initValues, setInitValues] = useState(null);

	const onFinish = async (values) => {
		try {
			const resp = await updateInvoice(values);
			if (resp === "success") {
				toast.success("Facture mise à jour avec succès");
				setInitValues({});
				window.location.reload();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.error("Quelque chose n'a pas fonctionné !");
		console.log("Failed:", errorInfo);
	};

	const onClickLoading = () => {
		setLoader(true);
	};
	useEffect(() => {
		getSetting().then((data) => setInitValues(data.result));
	}, []);

	return (
		<Fragment>
			<Row className='mr-top' justify='center'>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={11}
					xl={11}
					className='border rounded column-design'>
					<Card bordered={false}>
						<Title level={4} className='m-2 text-center'>
						Réglage de la facture
						</Title>
						{initValues ? (
							<Form
								initialValues={{
									...initValues,
								}}
								form={form}
								name='basic'
								labelCol={{
									span: 7,
								}}
								labelWrap
								wrapperCol={{
									span: 16,
								}}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'>
								<Form.Item
									style={{ marginBottom: "10px" }}
									fields={[{ name: "Company Name" }]}
									label='Nom de l’entreprise'
									name='company_name'
									rules={[
										{
											required: true,
											message: "Veuillez saisir le nom de l’entreprise!",
										},
									]}>
									<Input />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									fields={[{ name: "Tagline" }]}
									label='Slogan'
									name='tag_line'
									rules={[
										{
											required: true,
											message: "S’il vous plaît entrer le slogan!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Adresse'
									name='address'
									rules={[
										{
											required: true,
											message: "S’il vous plaît entrer l'adresse!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label=' Numéro de téléphone'
									name='phone'
									rules={[
										{
											required: true,
											message: "S’il vous plaît entrer le numéro de téléphone!",
										},
									]}>
									<Input maxLength={14}/>
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Email '
									name='email'
									rules={[
										{
											required: true,
											message: "S’il vous plaît entrer l'adresse Email !",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Site Web'
									name='website'
									rules={[
										{
											required: true,
											message: "S’il vous plaît entrer le Site Web!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Pied de page'
									name='footer'
									rules={[
										{
											required: true,
											message: "S’il vous plaît entrer Pied de page!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									className={styles.addBtnContainer}>
									<Button
										type='primary'
										htmlType='submit'
										shape='round'
										loading={loader}
										onClick={onClickLoading}>
										Détails de la mise à jour
									</Button>
								</Form.Item>
							</Form>
						) : (
							<Loader />
						)}
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddDetails;
