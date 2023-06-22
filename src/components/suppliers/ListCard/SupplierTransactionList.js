import React from "react";
import { Card, Row, Col, Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const SupplierTransactionList = ({ list }) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`/transaction/${id}`}>{id}</Link>,
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("DD/MM/YYYY"),
		},

		{
			title: "Debit",
			dataIndex: "debit",
			key: "debit",
			render: (debit) => debit?.name,
		},
		{
			title: "Credit",
			dataIndex: "credit",
			key: "credit",
			render: (credit) => credit?.name,
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
		},

		{
			title: "Type ",
			dataIndex: "type",
			key: "type",
		},
		{
			title: "Particulars",
			dataIndex: "particulars",
			key: "particulars",
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
							All Transaction Information
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

export default SupplierTransactionList;
