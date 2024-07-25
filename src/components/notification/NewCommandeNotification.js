import { useState, useEffect } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import "./NotificationIcon.css";

function NewCommandeNotification() {
  const [notifications, setNotifications] = useState(() => {
    // Initialiser les notifications depuis le localStorage
    const savedNotifications = localStorage.getItem("newOrderNotifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(() => {
    // Initialiser le compteur de notifications non lues depuis le localStorage
    const savedUnreadCount = localStorage.getItem("unreadNewOrderCount");
    return savedUnreadCount ? JSON.parse(savedUnreadCount) : 0;
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connecté au serveur WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message reçu du serveur WebSocket:", message);
      if (message.type === "new_order") {
        setNotifications((prev) => {
          const updatedNotifications = [...prev, message];
          // Enregistrer les notifications dans le localStorage
          localStorage.setItem(
            "newOrderNotifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
        setUnreadCount((prev) => {
          const newCount = prev + 1;
          // Enregistrer le compteur de notifications non lues dans le localStorage
          localStorage.setItem("unreadNewOrderCount", JSON.stringify(newCount));
          return newCount;
        });
      }
    };

    ws.onerror = (error) => {
      console.error("Erreur WebSocket:", error);
    };

    ws.onclose = (event) => {
      console.log("Connexion WebSocket fermée :", event.code, event.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Réinitialiser le compteur lorsque les notifications sont vues
      setUnreadCount(0);
      localStorage.setItem("unreadNewOrderCount", JSON.stringify(0));
    }
  }

  return (
    <div className="notification-icon-container">
      <div>
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </div>
      <div className="notification-icon" onClick={handleNotificationClick}>
        <BellOutlined style={{ color: "#fadb14" }} />
      </div>
      {showNotifications && (
        <div className="notification-list-container">
          {notifications.map((item) => (
            <Alert
              key={item.order.id}
              message="Notification"
              showIcon
              description={
                <span>
                  La Commande{" "}
                  <Link to={`/sale/${item.order.id}`}>
                    {item.order.numCommande}
                  </Link>{" "}
                  a été envoyée
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

export default NewCommandeNotification;
