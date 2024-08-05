import React, { useState, useEffect } from "react";
import {
  BellOutlined,
  MessageOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { Alert, Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
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

  // send message function
  function sendMessage(phoneNumber) {
    axios
      .post("/v1/sms", {
        number: phoneNumber,
        message:
          "Cher(e) [Momeni gille],\n\nJ'espère que vous allez bien. Je me permets de vous contacter au sujet du solde en suspens concernant votre dette envers notre entreprise, [sai i lama]. Le montant dû s'élève à [montant] et la date d'échéance était fixée au [15/04/2003].\nNous vous serions reconnaissants de bien vouloir effectuer le paiement dans les plus brefs délais afin de régulariser cette situation. Vous pouvez effectuer le règlement via [presenciel].\n\nMerci d'avance pour votre attention et votre coopération.\n\nCordialement,\n[service client],\n[sai i lama],\n[693972665]"
      })
      .then((response) => {
        // Handle success, if needed
        console.log("Message sent successfully");
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Failed to send message:", error);
      });
  }
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
                        {item?.customer?.username}
                      </Link>{" "}
                      a une dette de {item?.due_amount}. depuis le{" "}
                      {moment(item.updated_at).format("DD/MM/YYYY")} contact:{" "}
                    </span>
                    <div className="d-flex custom-gap">
                      <Button
                        type="primary"
                        icon={<PhoneOutlined />}
                        style={{ marginBottom: "2px" }}
                      >
                        <a
                          href={`tel:${customer?.phone}`}
                          style={{ color: "white" }}
                        >
                          {customer?.phone}
                        </a>
                      </Button>
                      <Button
                        type="primary"
                        icon={<MessageOutlined />}
                        onClick={() => sendMessage(customer?.phone)}
                      >
                        Envoyé un Message
                      </Button>
                    </div>
                  </>
                }
                type="warning"
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
