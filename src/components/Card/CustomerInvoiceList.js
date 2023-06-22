import { Link } from "react-router-dom";
import { Table, Card } from "antd";
import moment from "moment";

function CustomerInvoiceList({ list, linkTo }) {
	const columns = [
		{
			title: "Invoice ",
			dataIndex: "id",
			key: "id",
			render: (id) => <Link to={`${linkTo}/${id}`}>{id}</Link>,
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date) => moment(date).format("ll"),
		},
		{
			title: "Total Amount",
			dataIndex: "total_amount",
			key: "total_amount",
		},
		{
			title: "Discount",
			dataIndex: "discount",
			key: "discount",
			responsive: ["md"],
		},
		{
			title: "Due Amount",
			dataIndex: "due_amount",
			key: "due_amount",
			responsive: ["md"],
		},
		{
			title: "Paid Amount",
			dataIndex: "paid_amount",
			key: "paid_amount",
			responsive: ["md"],
		},
		{
			title: "Profit",
			dataIndex: "profit",
			key: "profit",
			responsive: ["md"],
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "payment",
			render: (id) => (
				<Link to={`/payment/customer/${id}`}>
					<button className='btn btn-dark btn-sm' type='submit'>
						Payment
					</button>
				</Link>
			),
			fixed: "right",
		},
	];

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<div className='mt-1'>
			<Card
				className='header-solid h-full'
				bordered={false}
				title={[
					<h5 className='font-semibold m-0 text-center'>
						Customer Invoice Information
					</h5>,
				]}
				bodyStyle={{ paddingTop: "0" }}>
				<Table
					scroll={{ x: true }}
					loading={!list}
					// pagination={{
					//   defaultPageSize: 10,
					//   pageSizeOptions: [10, 20, 50, 100, 200],
					//   showSizeChanger: true,
					//   total: total,

					//   // onChange: (page, limit) => {
					//   //   dispatch(loadSuppliers({ page, limit }));
					//   // },
					// }}
					columns={columns}
					dataSource={list ? addKeys(list) : []}
				/>
			</Card>
		</div>
	);
}

export default CustomerInvoiceList;
