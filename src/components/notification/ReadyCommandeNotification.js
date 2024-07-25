import { useState, useEffect } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import "./NotificationIcon.css";

function ReadyCommandeNotification() {
  const [notifications, setNotifications] = useState(() => {
    // Initialiser les notifications depuis le localStorage
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connecté au serveur WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message reçu du serveur WebSocket:", message);

      if (message.type === "update_order") {
        setNotifications((prev) => {
          const updatedNotifications = [...prev, message];
          // Enregistrer les notifications dans le localStorage
          localStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
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
    // Marquer les notifications comme lues (enlever du localStorage)
    if (!showNotifications) {
      localStorage.removeItem("notifications");
    }
  }

  return (
    <div className="notification-icon-container">
      <div>
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>
      <div className="notification-icon" onClick={handleNotificationClick}>
        <BellOutlined style={{ color: "#fadb14" }} />
      </div>
      {showNotifications && (
        <div className="notification-list-container1">
          {notifications.map((item) => (
            <Alert
              key={item.order.id}
              message="Notification"
              showIcon
              description={
                <div>
                  La Commande{" "}
                  <Link to={`/sale/${item.order.id}`}>
                    {item.order.numCommande}
                  </Link>{" "}
                  est prête
                </div>
              }
              type="info"
              style={{ marginBottom: "10px" }}
              closable
              onClose={() =>
                setNotifications((prev) => {
                  const updatedNotifications = prev.filter(
                    (notification) => notification.order.id !== item.order.id
                  );
                  // Mettre à jour le localStorage
                  localStorage.setItem(
                    "notifications",
                    JSON.stringify(updatedNotifications)
                  );
                  return updatedNotifications;
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReadyCommandeNotification;
