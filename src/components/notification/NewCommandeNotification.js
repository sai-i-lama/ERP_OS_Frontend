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


function NotificationSystem({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Identify the user when they connect
    if (userId) {
      console.log(`user ${userId} is identifying`);
      socket.emit("identify", { userId });
    }

    // Handle incoming notifications
    const handleUserNotification = (notification) => {
      console.log("Received notification:", notification);

      if (notification && notification.id && notification.type) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification
        ]);

        toast(notification.message, {
          type: notification.type === "general" ? "info" : "warning",
          autoClose: 5000, // Durée d'affichage du toast
          position: toast.POSITION.TOP_RIGHT // Position du toast
        });
      } else {
        console.error(
          "Notification data is missing or incomplete:",
          notification
        );
      }
    };

    // Listen for customer notifications
    socket.on("user-notification", handleUserNotification);

    // Clean up event listener on component unmount
    return () => {
      socket.off("user-notification", handleUserNotification);
    };
  }, [userId]);

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
            body: JSON.stringify({ userId })
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
              type={item.type === "general" ? "info" : "warning"}
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

export default NotificationSystem;
