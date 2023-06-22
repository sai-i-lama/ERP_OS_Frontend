import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./card.css";

const UploadMany = ({ urlPath }) => {
	const [loader, setLoader] = useState(false);
	const [file, setFile] = useState();

	const fileReader = new FileReader();

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	const csvFileToArray = (string) => {
		const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
		const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

		const array = csvRows.map((i) => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});
		// array -> array of objects

		// post request to backend using axios

		const resp = axios.post(`${urlPath}?query=createmany`, array);
		resp
			.then((d) => {
				if (d.statusText === "OK") {
					setLoader(false);
					toast.success("Uploaded Success");
				}
			})
			.catch((err) => {
				console.log(err, "err");
				toast.error("error in uploading ");
				setLoader(false);
			});
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		setLoader(true);

		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	};

	return (
		<div className='text-center mt-2 '>
			<form className='form-group '>
				<input
					className='form-control'
					type={"file"}
					id={"csvFileInput"}
					accept={".csv"}
					onChange={handleOnChange}
				/>
				<br />

				<Button
					className='mt-2'
					type='primary'
					htmlType='submit'
					shape='round'
					loading={loader}
					onClick={handleOnSubmit}>
					Import From CSV
				</Button>
			</form>
		</div>
	);
};

export default UploadMany;
