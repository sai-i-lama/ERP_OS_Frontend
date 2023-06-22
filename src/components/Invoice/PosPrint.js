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
import getSetting from "../../api/getSettings";
import "./style.css";

const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
	return (
		<Fragment>
			<div ref={ref} className='wrapper'>
				<div className='pos-print-body'>
					<div className='bill'>
						<div className='top-container'>
							<div className='brand'>{invoiceData?.company_name}</div>
							<div className='tagline'>{invoiceData?.tag_line}</div>
							<div className='address'>
								{invoiceData?.address} <br /> {invoiceData?.phone}
							</div>
							<div className='email'>{invoiceData?.email}</div>
							<div className='website'>{invoiceData?.website} </div>
							<div className='bill-details'>
								<div className='flex justify-content-center'>
									<div>BILL NO: {data?.saleInvoiceProduct[0].invoice_id}</div>
								</div>
								<div className='flex justify-content-center'>
									<div>
										BILL DATE: {moment(data?.date).format("YYYY-MM-DD")}
									</div>
								</div>
							</div>
						</div>
					</div>
					<table className='table'>
						<tr className='header'>
							<th>Particulars</th> <th>Rate</th> <th>Qty</th>
							<th>Amount</th>
						</tr>

						{data &&
							data.saleInvoiceProduct.map((d) => (
								<tr key={d.id} className='data'>
									<td>{d.product.name}</td>
									<td>{d.product_sale_price}</td>
									<td>{d.product_quantity}</td>
									<td>{d.product_quantity * d.product_sale_price}</td>
								</tr>
							))}
						<tr className='subtotal'>
							<td></td>
							<td>Sub total</td>
							<td>
								{data.saleInvoiceProduct?.reduce(
									(totalQty, item) => totalQty + item.product_quantity,
									0
								)}
							</td>
							<td>{data.total_amount}</td>
						</tr>
						<tr className='discount'>
							<td></td>
							<td>Discount</td>
							<td></td>
							<td>{data.discount}</td>
						</tr>
						<tr className='total'>
							<td></td>
							<td>Total</td>
							<td></td>
							<td>{data.total_amount - data.discount}</td>
						</tr>
					</table>
					{invoiceData?.footer} <br />© ERPOS | Omega Solution
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
			<div className='hidden'>
				<PrintToPdf ref={componentRef} data={data} invoiceData={invoiceData} />
			</div>
			{invoiceData && (
				<Button type='primary' shape='round' onClick={handlePrint}>
					POS Print
				</Button>
			)}
		</div>
	);
};

export default PosPrint;
