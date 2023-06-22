import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Form, InputNumber, Row } from "antd";
import "./products.css";

export default function Products({
	allProducts,
	formData,
	setData,
	updateFormData,
	selectedProds,
	handleSelectedProdsQty,
	handleDeleteProd,
	handleSelectedProdsUnitPrice,
}) {
	return (
		<div className='products-container-wrapper'>
			<div className='products-container'>
				<Row gutter={[16]}>
					<Col span={2}>
						<div className='font-weight-bold border-b'>SL</div>
					</Col>
					<Col span={5}>
						<div className='font-weight-bold border-b'>Product</div>
					</Col>
					<Col span={3}>
						<div className='font-weight-bold border-b'>U.M</div>
					</Col>
					<Col span={4}>
						<div className='font-weight-bold'>QTY </div>
					</Col>
					<Col span={4}>
						<div className='font-weight-bold'>U.Price</div>
					</Col>
					<Col span={3}>
						<div className='font-weight-bold'>Total</div>
					</Col>
					<Col span={3}>
						<div></div>
					</Col>
				</Row>

				<hr style={{ backgroundColor: "black" }} />

				<Form.List name='saleInvoiceProduct'>
					{(fields, { add, remove }) => (
						<>
							{selectedProds.map(
								(
									{
										id,
										name,
										sale_price,
										selectedQty,
										unit_measurement,
										...restField
									},
									index
								) => (
									<Row gutter={[16]} key={id} style={{ margin: "20px 0" }}>
										<Col span={2}>
											<Form.Item {...restField} name={[name, "product_id"]}>
												{index + 1}
											</Form.Item>
										</Col>
										<Col span={5}>
											<Form.Item {...restField} name={[name, "product_id"]}>
												{name}
											</Form.Item>
										</Col>
										<Col span={3}>
											<Form.Item>
												<div className='font-weight-bold'>
													{unit_measurement ? unit_measurement : 0}
												</div>
											</Form.Item>
										</Col>
										<Col span={4}>
											<Form.Item
												{...restField}
												name={[name, "product_quantity"]}>
												<InputNumber
													style={{ width: "100%" }}
													placeholder='Product Quantity'
													onChange={(qty) => handleSelectedProdsQty(id, qty)}
													defaultValue={selectedQty}
												/>
											</Form.Item>
										</Col>
										<Col span={4}>
											<Form.Item
												{...restField}
												name={[name, "product_sale_price"]}>
												<InputNumber
													style={{ width: "100%" }}
													placeholder='Product Unit Price'
													onChange={(price) =>
														handleSelectedProdsUnitPrice(id, price)
													}
													defaultValue={sale_price}
												/>
											</Form.Item>
										</Col>
										<Col span={3}>
											<Form.Item>
												<div className='font-weight-bold'>
													{selectedQty * sale_price}
												</div>
											</Form.Item>
										</Col>
										<Col span={3}>
											<Form.Item>
												<Button
													shape='circle'
													icon={<DeleteOutlined />}
													onClick={() => {
														handleDeleteProd(id);
														// updateFormData();
													}}></Button>
											</Form.Item>
										</Col>
									</Row>
								)
							)}
						</>
					)}
				</Form.List>
			</div>
		</div>
	);
}

// {
//   "total_amount": 10,
//   "due_amount": 1,
//   "paid_amount": 11,
//   "supplier_id":1,
//   "purchaseInvoiceProduct": [
//       {
//           "product_id": 1,
//           "product_quantity": 1,
//           "product_purchase_price": 500
//       },
//       {
//           "product_id": 2,
//           "product_quantity": 10,
//           "product_purchase_price": 800
//       }
//   ]
// }
