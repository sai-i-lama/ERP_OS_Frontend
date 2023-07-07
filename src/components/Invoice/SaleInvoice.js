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
			<div ref={ref} className='wrapper'>
				<div className='box2'>
					<h1>{invoiceData?.company_name}</h1>
					<h3>{invoiceData?.tag_line}</h3>
					<p>{invoiceData?.address}</p>
					<p>{invoiceData?.phone}</p>
					<p>Email: {invoiceData?.email}</p>
					<p>site web: {invoiceData?.website}</p>
				</div>

				<div className='box4'>
					<hr className='hr1' />
					<h3 className='center'>FACTURE DE VENTE</h3>
					<hr className='hr1' />
				</div>

				<div className='box4'>
					<hr className='hr1' />
					<h3 className='center'>FACTURE DE VENTE</h3>
					<hr className='hr1' />
				</div>

				<div className='box5'>
					<table className='table2'>
						<tr>
							<th>Id Client </th>
							<td>{data?.customer_id}</td>
						</tr>
						<tr>
							<th>Nom Client </th>
							<td>{data?.customer.name}</td>
						</tr>
						<tr>
							<th>Adresse</th>
							<td>{data?.customer.address}</td>
						</tr>
						<tr>
							<th>Contact No</th>
							<td>{data?.customer.phone}</td>
						</tr>
					</table>
				</div>

				<div className='box6'>
					<table className='table2'>
						<tr>
							<th>Facture No</th>
							<td>{data?.id}</td>
						</tr>
						<tr>
							<th>Date de Facturation</th>
							<td>{moment(data?.date).format("YYYY-MM-DD")}</td>
						</tr>
					</table>
				</div>

				<div className='box7'>
					<table className='table1'>
						<thead>
							<th>Sl</th>
							<th>Description du produit</th>
							<th>Quantité</th>
							<th>Prix unitaire</th>
							<th>Prix total</th>
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
										<td>{d.product_sale_price}</td>
										<td>{d.product_quantity * d.product_sale_price}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				<div className='box9'>
					<table className='table2'>
						<tr>
							<th>Sub total</th>
							<td>{data.total_amount}</td>
						</tr>
						<tr>
							<th>Remise (-)</th>
							<td>{data.discount}</td>
						</tr>
						<tr>
							<th>Grand total</th>
							<td>{data.total_amount - data.discount}</td>
						</tr>
						<tr>
							<th>Payé</th>
							<td>{data.paid_amount}</td>
						</tr>
						<tr>
							<th>Du</th>
							<td>{data.due_amount}</td>
						</tr>
					</table>
				</div>

				<div className='box10'>
					<hr />
					<p>Reçu par</p>
				</div>

				<div className='box11'>
					<hr />
					<p>Autorisé par</p>
				</div>

				<div className='box12'>
					<hr />
					<p>DTA INNOV | Contact: +(XXX) XXX-XXX-XXX</p>
				</div>

				<div className='box13'>
					<p>
						<b>In Words: </b>
						{number2words(data.total_amount - data.discount)}
					</p>
				</div>
			</div>
		</Fragment>
	);
});

const SaleInvoice = ({ data }) => {
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
					Imprimer PDF
				</Button>
			)}
		</div>
	);
};

export default SaleInvoice;
