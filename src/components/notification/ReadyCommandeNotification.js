import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Alert } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotificationIcon.css";

const socket = io("http://localhost:5001");

function ReadyCommandeNotification({ userId }) {
  // Recevoir l'identifiant de l'utilisateur en tant que prop
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick() {
    setShowNotifications(!showNotifications);
  }

  useEffect(() => {
    // S'enregistrer avec l'identifiant de l'utilisateur
    socket.emit("identify", userId);

    // Écouter les notifications depuis le serveur
    socket.on("user-notification", (notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification
      ]);
      toast(notification.message, {
        type: notification.type === "update_order" ? "info" : "warning",
        autoClose: 5000, // Durée d'affichage du toast
        position: toast.POSITION.TOP_RIGHT // Position du toast
      });
    });

    // Nettoyage lors du démontage du composant
    return () => {
      socket.off("user-notification");
    };
  }, [userId]);

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
              message="warning"
              showIcon
              description={
                <div>
                  votre Commande{" "}
                  <Link to={`/sale/${item.order.id}`}>
                    {item.order.numCommande}
                  </Link>{" "}
                  est prête
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
}

export default ReadyCommandeNotification;
