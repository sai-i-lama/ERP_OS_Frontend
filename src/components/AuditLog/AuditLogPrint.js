// AuditLogPrint.js
import React, { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import moment from "moment";
import getSetting from "../../api/getSettings";
import "./style.css"; // Assurez-vous que ce fichier CSS existe et contient les styles nécessaires

const AuditLogPrintContent = forwardRef(({ data }, ref) => {
  const [invoiceData, setInvoiceData] = useState(null);
  useEffect(() => {
    getSetting().then((data) => setInvoiceData(data.result));
  }, []);

  return (
    <Fragment>
      <div ref={ref} className="wrapper">
        <div className="box2">
          <h1>{invoiceData?.company_name}</h1>
          <h3>{invoiceData?.tagline}</h3>
          <p>{invoiceData?.address}</p>
          <p>{invoiceData?.phone}</p>
          <p>Email: {invoiceData?.email}</p>
          <p>Site web: {invoiceData?.website}</p>
        </div>

        <div className="box4">
          <hr className="hr1" />
          <h3 className="center">Journal des Logs d'Audit</h3>
          <hr className="hr1" />
        </div>

        <div className="box7">
          <table className="table1">
            <thead>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Action</th>
              <th>Date</th>
              <th>Détails</th>
            </thead>
            <tbody>
              {data &&
                data.map((log, index) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.user?.userName || "Utilisateur Inconnu"}</td>
                    <td>{log.action}</td>
                    <td>{moment(log.timestamp).format("DD/MM/YY HH:mm")}</td>
                    <td>{log.details}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="box10">
          <hr />
          <p>Signature</p>
        </div>

        <div className="box12">
          <hr />
          <p>{invoiceData?.company_name} | Contact: {invoiceData?.phone}</p>
        </div>
      </div>
    </Fragment>
  );
});

const AuditLogPrint = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="hidden">
        <AuditLogPrintContent ref={componentRef} data={data} />
      </div>
      <Button type="primary" shape="round" onClick={handlePrint}>
        Imprimer
      </Button>
    </div>
  );
};

export default AuditLogPrint;