import PageTitle from "../page-header/PageHeader";

import { Navigate } from "react-router-dom";
import AddPurch from "./addPurch";

const Purchase = (props) => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}
	return (
		<div>
			<PageTitle title='Back' />

			<AddPurch />
		</div>
	);
};

export default Purchase;
