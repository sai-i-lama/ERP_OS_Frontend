import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const CustomerDetails = ({ customer }) => {
  return (
    <div className="d-flex justify-content-start">
      <Avatar
        className="me-2"
        shape="square"
        size={"small"}
        style={{
          backgroundColor: "#87d068",
        }}
        icon={<UserOutlined />}
      />
      <div>
        <Tag>{customer.name}</Tag>
        <Tag>{customer.phone}</Tag>
        <Tag>{customer.address}</Tag>
        <Tag>
          Due Amount : <strong>{customer.due_amount}</strong>
        </Tag>
      </div>
    </div>
  );
};
