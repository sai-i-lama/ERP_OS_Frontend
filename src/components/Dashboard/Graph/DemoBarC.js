import React from "react";
import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";

const DemoPieChart = () => {
  const data = useSelector((state) => state.dashboard.list?.top4Products);

  // Vérification de la disponibilité des données
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  // Assurez-vous que `data` a les champs corrects
  const config = {
    appendPadding: 10,
    data: data,
    angleField: "percentageSold", // Utilisez le champ qui contient les pourcentages
    colorField: "name", // Utilisez un champ approprié pour la couleur, comme le nom du produit
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center"
      }
    },
    interactions: [
      {
        type: "element-active"
      }
    ]
  };

  return <Pie {...config} />;
};

export default DemoPieChart;
