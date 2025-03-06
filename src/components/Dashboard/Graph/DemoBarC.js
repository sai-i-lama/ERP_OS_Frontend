import React from "react";
import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";

const DemoPieChart = () => {
  // Récupérer les données des produits depuis le Redux store
  const data = useSelector((state) => state.dashboard.list?.top4Products);

  // Vérification de la disponibilité des données
  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  // Configuration du graphique à secteurs (Pie Chart)
  const config = {
    appendPadding: 10,
    data: data,
    angleField: "percentageSold", // Utilisation du pourcentage vendu pour l'angle
    colorField: "name", // Utilisation du nom du produit pour la couleur
    radius: 1,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(2)}%`, // Affichage du pourcentage
      style: {
        fontSize: 14,
        textAlign: "center"
      }
    },
    interactions: [
      {
        type: "element-active"
      }
    ],
    tooltip: {
      // Champs utilisés pour le tooltip
      fields: ["name", "totalSaleValue"],
      // Format du tooltip pour afficher le montant généré par produit
      formatter: (datum) => ({
        name: datum.name,
        value: `Montant généré : ${datum.totalSaleValue} FCFA`
      })
    }
  };

  return <Pie {...config} />;
};

export default DemoPieChart;
