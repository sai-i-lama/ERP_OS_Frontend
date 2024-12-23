import { Button } from "antd";
import moment from "moment";
import React, {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/images/sai-i-lama-logo.png";
import getSetting from "../../api/getSettings";
import "./style.css";

const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
  return (
    <Fragment>
      <div ref={ref} className="wrapper">
        <div className="pos-print-body">
          <div className="bill">
            <div>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "50%",
                  height: "30%",
                //   objectFit: "cover",
                }}
              />
            </div>
            <div className="top-container">
              <div className="brand">{invoiceData?.company_name}</div>
              <div className="tagline">{invoiceData?.tag_line}</div>
              <div className="address">
                {invoiceData?.address} <br /> {invoiceData?.phone}
              </div>
              <div className="email">{invoiceData?.email}</div>
              <div className="website">{invoiceData?.website} </div>
              <div className="bill-details">
                <div className="flex justify-content-center">
                  <div>
                    FACTURE NO: {data?.saleInvoiceProduct[0].invoice_id}
                  </div>
                </div>
                <div className="flex justify-content-center">
                  <div>
                    DATE DE LA FACTURE:{" "}
                    {moment(data?.date).format("DD MM YY HH:mm")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className="table">
            <tr className="header">
              <th>Produit</th> <th>Prix Unitaire</th> <th>Quantité</th>
              <th>Montant</th>
            </tr>

            {data &&
              data.saleInvoiceProduct.map((d) => (
                <tr key={d.id} className="data">
                  <td>{d.product.name}</td>
                  <td>{d.product_sale_price}</td>
                  <td>{d.product_quantity}</td>
                  <td>{d.product_quantity * d.product_sale_price}</td>
                </tr>
              ))}
            <tr className="subtotal">
              <td></td>
              <td>Montant total</td>
              <td>
                {data.saleInvoiceProduct?.reduce(
                  (totalQty, item) => totalQty + item.product_quantity,
                  0
                )}
              </td>
              <td>{data.total_amount}</td>
            </tr>
            <tr className="discount">
              <td></td>
              <td>Remise</td>
              <td></td>
              <td>{data.discount}</td>
            </tr>
            <tr className="total">
              <td></td>
              <td>Total à Payer</td>
              <td></td>
              <td>{data.total_amount - data.discount}</td>
            </tr>
          </table>
          {invoiceData?.footer} <br />© SAI I LAMA | #Slogan
        </div>
      </div>
    </Fragment>
  );
});

const PosPrint = ({ data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    getSetting().then((data) => setInvoiceData(data.result));
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

export default PosPrint;
