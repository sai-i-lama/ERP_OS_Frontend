import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const SupplierDetail = ({ supplier }) => {
	return (
		<div className='d-flex justify-content-start'>
			<Avatar
				className='me-2'
				shape='square'
				size={"small"}
				style={{
					backgroundColor: "#87d068",
				}}
				icon={<UserOutlined />}
			/>
			<div>
				<Tag>{supplier.name}</Tag>
				<Tag>{supplier.phone}</Tag>
				<Tag>{supplier.address}</Tag>
				<Tag>
					Due Amount : <strong>{supplier.due_amount}</strong>
				</Tag>
			</div>
		</div>
	);
};
