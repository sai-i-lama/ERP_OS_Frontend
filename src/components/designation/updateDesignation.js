import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../page-header/PageHeader";

//Update Designation API REQ
const updateDesignation = async (id, values) => {
	try {
		await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `designation/${id}`,
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

function UpdateDesignation() {
	const { Title } = Typography;
	const [form] = Form.useForm();
	const [success, setSuccess] = useState(false);
	const { id } = useParams();

	//Loading Old data from URL
	const location = useLocation();
	const { data } = location.state;

	const cust = data;
	const [initValues, setInitValues] = useState({
		name: cust.name,
		phone: cust.phone,
		address: cust.address,
		due_amount: cust.due_amount,
	});

	const onFinish = (values) => {
		try {
			updateDesignation(id, values);
			setSuccess(true);
			toast.success("Designation details is updated");
			setInitValues({});
		} catch (error) {
			console.log(error.message);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	return (
		<>
			<PageTitle title={`back`} />
			<div className='text-center'>
				<Card className='mt-2'>
					<Row className='mr-top'>
						<Col
							xs={24}
							sm={24}
							md={24}
							lg={10}
							xl={10}
							className='border rounded column-design'>
							{success && (
								<div>
									<Alert
										message={`Designation details updated successfully`}
										type='success'
										closable={true}
										showIcon
									/>
								</div>
							)}
							<Title level={3} className='m-3 text-center'>
								Edit Designation Form
							</Title>
							<Form
								initialValues={{
									...initValues,
								}}
								form={form}
								className='m-4'
								name='basic'
								labelCol={{
									span: 8,
								}}
								wrapperCol={{
									span: 16,
								}}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete='off'>
								<Form.Item
									style={{ marginBottom: "10px" }}
									fields={[{ name: "Name" }]}
									label='Name'
									name='name'
									rules={[
										{
											required: true,
											message: "Please input Designation name!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									style={{ marginBottom: "10px" }}
									wrapperCol={{
										offset: 8,
										span: 16,
									}}>
									<Button block type='primary' htmlType='submit' shape='round'>
										Update Now
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Card>
			</div>
		</>
	);
}

export default UpdateDesignation;
