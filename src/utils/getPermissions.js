import jwtDecode from "jwt-decode";

const getPermissions = () => {
	const token = localStorage.getItem("access-token");

	if (token) {
		const permissions = jwtDecode(token)?.permissions;
		return permissions;
	}
};

export default getPermissions;