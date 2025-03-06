import React from "react";
import { Card } from "antd";

const CardComponent = ({ title, children }) => {
  return (
    <Card
      title={title}
      style={{
        minwidth: 500,
      }}>
      {children}
    </Card>
  );
};

export default CardComponent;
