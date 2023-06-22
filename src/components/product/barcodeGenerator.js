import React from "react";
import { useBarcode } from "next-barcode";

function GenerateBarcode({ sku }) {
	const { inputRef } = useBarcode({
		value: `${sku}`,
		options: {
			background: "#FFFFFF",
		},
	});

	return <svg ref={inputRef} />;
}

export default GenerateBarcode;
