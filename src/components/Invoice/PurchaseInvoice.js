import { Button } from "antd";
import moment from "moment";
import React, {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useState
} from "react";
import { useReactToPrint } from "react-to-print";
import getSetting from "../../api/getSettings";
import number2words from "../../utils/numberToWords";
import "./style.css";

const PrintToPdf = forwardRef(({ data }, ref) => {
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
          <p>site web: {invoiceData?.website}</p>
        </div>

        <div className="box4">
          <hr className="hr1" />
          <h3 className="center">FACTURE D’ACHAT</h3>
          <hr className="hr1" />
        </div>

        <div className="box5">
          <table className="table2">
            <tr>
              <th>Id Client</th>
              <td>{data?.supplier_id}</td>
            </tr>
            <tr>
              <th>Nom Client</th>
              <td>{data?.supplier.name}</td>
            </tr>
            <tr>
              <th>Adresse</th>
              <td>{data?.supplier.address}</td>
            </tr>
            <tr>
              <th>Contact </th>
              <td>{data?.supplier.phone}</td>
            </tr>
          </table>
        </div>

        <div className="box6">
          <table className="table2">
            <tr>
              <th>N° Facture </th>
              <td>{data?.id}</td>
            </tr>
            <tr>
              <th>Date de Facturation</th>
              <td>{moment(data?.date).format("DD/MM/YY HH:mm")}</td>
            </tr>
          </table>
        </div>

        <div className="box7">
          <table className="table1">
            <thead>
              <th>Sl</th>
              <th>Description du produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Prix Total </th>
            </thead>
            <tbody>
              {data &&
                data.purchaseInvoiceProduct.map((d) => (
                  <tr>
                    <td>{d.id}</td>
                    <td>
                      <p>{d.product.name}</p>
                    </td>
                    <td>{d.product_quantity}</td>
                    <td>{d.product_purchase_price}</td>
                    <td>{d.product_quantity * d.product_purchase_price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="box9">
          <table className="table2">
            <tr>
              <th>Montant Total</th>
              <td>{data.total_amount}</td>
            </tr>
            <tr>
              <th>Remise (-)</th>
              <td>{data.discount}</td>
            </tr>
            <tr>
              <th>Après Remise</th>
              <td>{data.total_amount - data.discount}</td>
            </tr>
            <tr>
              <th>Montant Payé</th>
              <td>{data.paid_amount}</td>
            </tr>
            <tr>
              <th>Montant Du</th>
              <td>{data.due_amount}</td>
            </tr>
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

        <div className="box13">
          <p>
            <b>In Words: </b>
            {number2words(data.total_amount - data.discount)}
          </p>
          <p>
            <b>Notes: </b>
            {data.note}
          </p>
        </div>
      </div>
    </Fragment>
  );
});

const PurchaseInvoice = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="hidden">
        <PrintToPdf ref={componentRef} data={data} />
      </div>
      <Button type="primary" shape="round" onClick={handlePrint}>
      Imprimer
      </Button>
    </div>
  );
};

export default PurchaseInvoice;
