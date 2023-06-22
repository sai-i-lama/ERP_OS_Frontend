import React from "react";
import { Card, Row, Col, Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const SupplierReturnInvoiceList = ({ list }) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("DD/MM/YYYY"),
		},

		{
			title: "Total Amount",
			dataIndex: "total_amount",
			key: "total_amount",
		},
		{
			title: "Note",
			dataIndex: "note",
			key: "note",
		},
		{
			title: "Purchase Invoice No",
			dataIndex: "purchaseInvoice_id",
			key: "purchaseInvoice_id",
			render: (purchaseInvoice_id) => (
				<Link to={`/purchase/${purchaseInvoice_id}`}>{purchaseInvoice_id}</Link>
			),
		},
	];

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24} className='mt-2'>
				<Card
					className='header-solid h-full'
					bordered={false}
					title={[
						<h6 className='font-semibold m-0 text-center'>
							All Return Information
						</h6>,
					]}
					bodyStyle={{ paddingTop: "0" }}>
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

export default SupplierReturnInvoiceList;
