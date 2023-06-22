import { Col, InputNumber, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const PurchaseProductListCard = ({ list, updateReturn, returnOnChange }) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "product_id",
			key: "product_id",
		},
		{
			title: "Name",
			dataIndex: "product",
			key: "product.name",
			render: (product) => (
				<Link to={`/product/${product.id}`}>{product.name}</Link>
			),
		},
		{
			title: "Product Quantity",
			dataIndex: "product_quantity",
			key: "product_quantity",
		},
		{
			title: "Product Unit Price",
			dataIndex: "product_purchase_price",
			key: "product_purchase_price",
		},
		{
			title: "Total Price ",
			key: "Total Price ",
			dataIndex: "",
			render: ({
				product_quantity,
				product_purchase_price,
				remain_quantity,
				return_quantity,
			}) => {
				if (return_quantity) {
					return remain_quantity * product_purchase_price;
				} else {
					return product_purchase_price * product_quantity;
				}
			},
		},
	];

	if (updateReturn) {
		columns.splice(4, 0, {
			title: "Return Quantity",
			dataIndex: "return_quantity",
			key: "return_quantity",
			width: "150px",
			render: (
				value,
				{ product_id, product_quantity, product_purchase_price: price }
			) => {
				return (
					<div>
						<InputNumber
							onChange={(value) =>
								returnOnChange({ id: product_id, value, price })
							}
							style={{ width: "120px" }}
							placeholder='Return Qty'
							max={product_quantity}
							min={0}
							value={value}
						/>
					</div>
				);
			},
		});
	}

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24} className='mt-2'>
				<div
					className='header-solid h-full m-2'
					bordered={false}
					bodyStyle={{ paddingTop: "0" }}>
					<h6 className='font-semibold m-0 text-center'>
						Purchased Product Information
					</h6>
					<hr />
					<div className='col-info'>
						<Table
							scroll={{ x: true }}
							loading={!list}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default PurchaseProductListCard;
