import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotificationIcon.css";

// Connect to Socket.io server
 const socket = io("http://localhost:5001");
// const socket = io("http://192.168.1.176:5001");


function ReadyCommandeNotification({ customerId }) {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Identify the user when they connect
    if (customerId) {
      console.log(`Customer ${customerId} is identifying`);
      socket.emit("identify", { customerId });
    }

    // Handle incoming notifications
    const handleCustomerNotification = (notification) => {
      console.log("Received notification:", notification);

      if (notification && notification.id && notification.type) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification
        ]);

        let toastType;
        switch (notification.type) {
          case "update_order":
            toastType = "info";
            break;
          case "order":
          case "new_by_commande":
            toastType = "success";
            break;
          default:
            toastType = "default";
        }

        toast(notification.message, {
          type: toastType,
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        console.error(
          "Notification data is missing or incomplete:",
          notification
        );
      }
    };

    // Listen for customer notifications
    socket.on("customer-notification", handleCustomerNotification);

    // Clean up event listener on component unmount
    return () => {
      socket.off("customer-notification", handleCustomerNotification);
    };
  }, [customerId]);

  const handleNotificationClick = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      try {
        await fetch(
          "http://localhost:5001/v1/customer/markNotificationsAsRead",
          //"http://192.168.1.176/:5001/v1/customer/markNotificationsAsRead",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ customerId })
          }
        );

        // Update local state to mark notifications as read
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) => ({ ...notif, isRead: true }))
        );
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    }
  };

  // Filter unread notifications
  const unreadNotifications = notifications.filter((notif) => !notif.isRead);

  return (
    <div className="notification-icon-container">
      {/* Afficher le nombre de notifications non lues */}
      <div>
        {unreadNotifications.length > 0 && (
          <span className="notification-count">
            {unreadNotifications.length}
          </span>
        )}
      </div>
      {/* Icône de cloche */}
      <div className="notification-icon" onClick={handleNotificationClick}>
        <BellOutlined style={{ color: "#fadb14" }} />
      </div>
      {/* Liste des notifications lorsqu'on clique sur la cloche */}
      {showNotifications && (
        <div className="notification-list-container1">
          {notifications.map((item) => (
            <Alert
              key={item.id}
              message={<Link to={`/sale/${item.saleId}`}>{item.message}</Link>}
              showIcon
              type={
                item.type === "update_order"
                  ? "info"
                  : item.type === "order" || item.type === "new_by_commande"
                  ? "success"
                  : "default"
              }
              style={{ marginBottom: "16px" }}
              closable
            />
          ))}
        </div>
      )}
      <ToastContainer /> {/* Affiche les toasts */}
    </div>
  );
}

export default ReadyCommandeNotification;
