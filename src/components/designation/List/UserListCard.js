import { Card, Col, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const UserListCard = ({ list }) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "id_no",
			key: "id_no",
			render: (id_no, { id }) => <Link to={`/hr/staffs/${id}`}>{id_no}</Link>,
		},
		{
			title: "User Name",
			dataIndex: "username",
			key: "username",
		},

		{
			title: "Role",
			dataIndex: "role",
			key: "role",
		},
		{
			title: "email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "salary",
			dataIndex: "salary",
			key: "salary",
		},
		{
			title: "department",
			dataIndex: "department",
			key: "department",
		},
	];

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24}>
				<Card
					className='header-solid h-full'
					bordered={false}
					title={[
						<h5 className='font-semibold m-0 text-center'>
							Staffs Information
						</h5>,
					]}
					bodyStyle={{ padding: "0" }}>
					<div className='col-info'>
						<Table
							scroll={{ x: true }}
							loading={!list}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
};

export default UserListCard;
