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
				toast.success("Invoice Updated Successfully");
				setInitValues({});
				window.location.reload();
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		toast.error("Something went wrong !");
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
							Invoice Setting
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
									label='Company Name'
									name='company_name'
									rules={[
										{
											required: true,
											message: "Please input Company name!",
										},
									]}>
									<Input />
								</Form.Item>
								<Form.Item
									style={{ marginBottom: "10px" }}
									fields={[{ name: "Tagline" }]}
									label='Tagline'
									name='tag_line'
									rules={[
										{
											required: true,
											message: "Please input Tagline!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Address'
									name='address'
									rules={[
										{
											required: true,
											message: "Please input Address!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Phone Number'
									name='phone'
									rules={[
										{
											required: true,
											message: "Please input Phone Number!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Email Address'
									name='email'
									rules={[
										{
											required: true,
											message: "Please input Email Address!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Website'
									name='website'
									rules={[
										{
											required: true,
											message: "Please input Website!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									label='Footer'
									name='footer'
									rules={[
										{
											required: true,
											message: "Please input Footer!",
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
										Update Details
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
