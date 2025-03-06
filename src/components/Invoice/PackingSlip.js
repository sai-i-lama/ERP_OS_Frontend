import { Button } from "antd";
import moment from "moment";
import React, { forwardRef, Fragment, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import getSetting from "../../api/getSettings";
import number2words from "../../utils/numberToWords";
import "./style.css";

const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
  return (
    <Fragment>
      <div ref={ref} className="wrapper">
        <div className="box2">
          <h1>{invoiceData?.company_name}</h1>
          <h3>{invoiceData?.tag_line}</h3>
          <p>{invoiceData?.address}</p>
          <p>{invoiceData?.phone}</p>
          <p>Email: {invoiceData?.email}</p>
          <p>site web: {invoiceData?.website}</p>
        </div>

        <div className="box4">
          <hr className="hr1" />
          <h3 className="center">BON DE LIVRAISON</h3>
          <hr className="hr1" />
        </div>

        <div className="box4">
          <hr className="hr1" />
          <h3 className="center">BON DE LIVRAISON</h3>
          <hr className="hr1" />
        </div>

        <div className="box5">
          <table className="table2">
            <tr>
              <th>Id Client</th>
              <td>{data?.customer_id}</td>
            </tr>
            <tr>
              <th>Nom Client </th>
              <td>{data?.customer.username}</td>
            </tr>
            <tr>
              <th>Adresse</th>
              <td>{data?.customer.address}</td>
            </tr>
            <tr>
              <th>Contact </th>
              <td>{data?.customer.phone}</td>
            </tr>
            <tr>
              <th>Type de Client </th>
              <td>{data?.customer.type_customer}</td>
            </tr>
          </table>
        </div>

        <div className="box6">
          <table className="table2">
            <tr>
              <th>N° Facture</th>
              <td>{data?.id}</td>
            </tr>
            <tr>
              <th>Date de facturation</th>
              <td>{moment(data?.date).format("YYYY-MM-DD")}</td>
            </tr>
          </table>
        </div>

        <div className="box7">
          <table className="table1">
            <thead>
              <th>Sl</th>
              <th>Description du produit</th>
              <th>Quantité</th>
            </thead>
            <tbody>
              {data &&
                data.saleInvoiceProduct.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>
                      <p>{d.product.name}</p>
                    </td>
                    <td>{d.product_quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="box10">
          <hr />
          <p>Signature Client</p>
        </div>

        <div className="box11">
          <hr />
          <p>Signature Vendeur</p>
        </div>

        <div className="box12">
          <hr />
          <p>DTA INNOV | Contact: +(XXX) XXX-XXX-XXX</p>
        </div>
      </div>
    </Fragment>
  );
});

const PackingSlip = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const [invoiceData, setInvoiceData] = useState(null);
  useEffect(() => {
    getSetting()
      .then((response) => {
        if (response?.result) {
          setInvoiceData(response.result);
        } else {
          throw new Error("Les données de configuration sont manquantes");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des paramètres:", error);
      })
  }, []);

  return (
    <div>
      <div className="hidden">
        <PrintToPdf ref={componentRef} data={data} invoiceData={invoiceData} />
      </div>
      {invoiceData && (
        <Button type="primary" shape="round" onClick={handlePrint}>
          Imprimer
        </Button>
      )}
    </div>
  );
};

export default PackingSlip;
