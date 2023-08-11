import React, { useState, useEffect } from "react";
import { BellOutlined,WhatsAppOutlined, MessageOutlined  } from "@ant-design/icons";
import { Alert,Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCustomer } from "../../redux/actions/customer/getCustomerAction";
function DueClientNotification({ list }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllCustomer({ status: true }));
  }, []);
  const customerList = useSelector((state) => state.customers.list);
  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
  }
  const filteredList = list ? list.filter((item) => item.due_amount > 0) : [];

  return (
    <div className="notification-icon-container">
      <div>
        {list && list.length > 0 && (
          <span className="notification-count">{filteredList.length}</span>
        )}
      </div>
      <div className="notification-icon" onClick={handleNotificationClick}>
        <BellOutlined style={{ color: "#fadb14" }} />
      </div>
      {showNotifications && (
        <div className="notification-list-container">
          {filteredList.map((item) => {
            const customer = customerList.find(
              (customer) => customer.id === item?.customer?.id
            );

            return (
              <Alert
                key={item.id}
                message="warning"
                showIcon
                description={
                  <>
                    <span>
                      Le Client{" "}
                      <Link to={`/customer/${item?.customer?.id}`}>
                        {item?.customer?.name}
                      </Link>{" "}
                      a une dette de {item?.due_amount}. depuis le{" "}
                      {moment(item.updated_at).format("DD/MM/YYYY")} contact:{" "}
                      <a href={`tel:${customer?.phone}`}>{customer?.phone}</a>
                    </span>
                  </>
                }
                type="warning"
                style={{ marginBottom: "16px" }}
                closable
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DueClientNotification;
