import React from "react";

import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";

const DemoPie = () => {
  const data = useSelector((state) => state.dashboard.list?.SupplierVSCustomer);

  const config = {
    appendPadding: 10,
    data: data ? data : [],
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default DemoPie;
