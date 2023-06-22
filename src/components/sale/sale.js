import PageTitle from "../page-header/PageHeader";

import { Navigate } from "react-router-dom";
import AddSale from "./addSale";

const Sale = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	return (
		<div>
			<PageTitle title='Back' />
			<AddSale />
		</div>
	);
};

export default Sale;
