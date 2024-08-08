import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Alert } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotificationIcon.css";

const socket = io("http://localhost:5001");

function ReadyCommandeNotification({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Identify the user when they connect
    if (userId) {
      console.log(`User ${userId} is identifying`);
      socket.emit("identify", userId);
    }

    // Listen for user notifications
    const handleUserNotification = (notification) => {
      console.log("Received notification:", notification);

      // Ensure notification has necessary properties
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
          case "by_commande":
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

    socket.on("user-notification", handleUserNotification);

    // Clean up event listener on component unmount
    return () => {
      socket.off("user-notification", handleUserNotification);
    };
  }, [userId]);

  const handleNotificationClick = async () => {
    setShowNotifications(!showNotifications);

    // Mark notifications as read when clicking on the bell
    if (!showNotifications) {
      try {
        await fetch(
          "http://localhost:5001/v1/customer/markNotificationsAsRead",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId })
          }
        );

        // Update the local state to mark notifications as read
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
      <div>
        {unreadNotifications.length > 0 && (
          <span className="notification-count">
            {unreadNotifications.length}
          </span>
        )}
      </div>
      <div className="notification-icon" onClick={handleNotificationClick}>
        <BellOutlined style={{ color: "#fadb14" }} />
      </div>
      {showNotifications && (
        <div className="notification-list-container1">
          {notifications.map((item) => (
            <Alert
              key={item.id} // Use notification id
              message={item.message}
              showIcon
              type={
                item.type === "update_order"
                  ? "info"
                  : item.type === "by_commande" ||
                    item.type === "new_by_commande"
                  ? "success"
                  : "default"
              }
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
