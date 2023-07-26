import { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import "./NotificationIcon.css";

function NotificationIcon({ list }) {
  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
  }

  const notify = list ? list.filter((product) => product.quantity <= 10) : [];

  return (
    <div className="notification-icon-container">
      <div>
        {list && list.length > 0 && (
          <span className="notification-count">{notify.length}</span>
        )}
      </div>
      <div className="notification-icon" onClick={handleNotificationClick}>
        <BellOutlined style={{ color: "#fadb14" }} />
      </div>
      {showNotifications && (
        <div className="notification-list-container">
          {notify.map((item) => (
            <Alert
              key={item.id}
              message="warning"
              showIcon
              description={
                <span>
                  Le produit{" "}
                  <Link to={`/product/${item.id}`}>{item.name}</Link> a une
                  quantité inférieure ou égale à 10. Nous vous recommandons
                  de vous approvisionner dès que possible afin de garantir
                  que vous disposez suffisamment de stock pour répondre
                  aux demandes de vos clients.
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

export default NotificationIcon;