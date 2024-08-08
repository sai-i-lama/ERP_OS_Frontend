import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Alert } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotificationIcon.css";

const socket = io("http://127.0.0.1:5001"); // Assurez-vous que le port correspond à celui où le serveur WebSocket est en cours d'exécution

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
  }

  useEffect(() => {
    // Écouter les notifications depuis le serveur
    socket.on("staff-notification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification
      ]);
      toast(notification.message, {
        type: notification.type === "new_order" ? "info" : "warning",
        autoClose: 5000, // Durée d'affichage du toast
        position: toast.POSITION.TOP_RIGHT // Position du toast
      });
    });

    // Nettoyage lors du démontage du composant
    return () => {
      socket.off("staff-notification");
    };
  }, []);

  return (
    <div className="notification-icon-container ">
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
              message="warning"
              showIcon
              description={
                <div>
                  La Commande{" "}
                  <Link to={`/sale/${item.order.id}`}>
                    {item.order.numCommande}
                  </Link>{" "}
                  a été initiée
                </div>
              }
              type="warning"
              style={{ marginBottom: "16px" }}
              closable
            />
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NotificationSystem;
