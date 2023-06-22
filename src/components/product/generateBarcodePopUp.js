import { Button, Modal } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import GenerateBarcode from "./barcodeGenerator";
import moment from "moment";

const GenerateBarcodePopUp = ({ sku, quantity }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [count, setCount] = useState(1);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setCount(1);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setCount(1);
	};

	const handleCount = (e) => {
		e.preventDefault();
		setCount(e.target.value);
	};

	// make a function to print the body of id = "barcode" name it hanndlePrint and call it in the button onClick event handler
	const handlePrint = (e) => {
		e.preventDefault();

		const input = document.getElementById("barcode");
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const width = pdf.internal.pageSize.getWidth();
			const height = pdf.internal.pageSize.getHeight();
			pdf.addImage(imgData, "JPEG", 0, 0, width, height);
			pdf.save(`${moment().format("L")}_${sku}_Barcode.pdf`);
			// reload the page
			window.location.reload();
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<button className='btn btn-primary btn-sm' onClick={showModal}>
				Barcode
			</button>
			<Modal
				width={800}
				title={`View Barcode of Product`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<div className='d-flex justify-content-center'>
					<form onSubmit={onSubmit}>
						<div className='mb-3 text-center'>
							<label htmlFor='count' className='form-label me-3'>
								Number of barcodes:
							</label>
							<input
								type='number'
								className='form-control'
								id='count'
								value={count}
								onChange={handleCount}
							/>
						</div>
					</form>
					<div>
						<Button className='mt-2' type='primary' onClick={handlePrint}>
							{" "}
							Print{" "}
						</Button>
					</div>
				</div>
				{
					<div
						id='barcode'
						className='d-flex flex-wrap justify-content-center m-1'>
						{Array.from({ length: count }, (_, i) => (
							<div className='m-1'>
								<GenerateBarcode sku={sku} />
							</div>
						))}
					</div>
				}
			</Modal>
		</>
	);
};

export default GenerateBarcodePopUp;
