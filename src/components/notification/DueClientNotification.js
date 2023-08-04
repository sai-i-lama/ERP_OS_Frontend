import { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import "./NotificationIcon.css";
import moment from "moment";
function DueClientNotification({ list }) {
  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
  }

  const filteredList = list ? list.filter((item) => item.due_amount > 0) : [];

  return (
    <div className="notification-icon-container ">
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
          {filteredList.map((item) => (
            
            <Alert
              key={item.id}
              message="warning"
              showIcon
              description={
                <span>
                  Le Client{" "}
                  <Link to={`/customer/${item?.customer?.id}`}>{item?.customer?.name}</Link> a une
                  dette de {item?.due_amount}. depuis le {moment(item.updated_at).format('DD/MM/YYYY')}
                </span>
              }
              type="warning"
              style={{ marginBottom: "16px" }}
              closable
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DueClientNotification;