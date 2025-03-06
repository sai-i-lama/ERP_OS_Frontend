import axios from "axios";

export const getTrailBalance = async () => {
	try {
		const { data } = await axios({
			method: "get",
			url: `account?query=tb`,
		});
		return data;
	} catch (error) {
		console.log(error.message);
	}
};

export const getBalanceSheet = async () => {
	try {
		const { data } = await axios({
			method: "get",
			url: `account?query=bs`,
		});
		return data;
	} catch (error) {
		console.log(error.message);
	}
};

export const getIncomeStatement = async () => {
	try {
		const { data } = await axios({
			method: "get",
			url: `account?query=is`,
		});
		return data;
	} catch (error) {
		console.log(error.message);
	}
};

export const getMainAccount = async () => {
	try {
		const { data } = await axios({
			method: "get",
			url: `account?query=ma`,
		});

		return data;
	} catch (error) {
		console.log(error.message);
	}
};

export const getSubAccount = async (id) => {
	try {
		const { data } = await axios({
			method: "get",
			url: `account/${id}`,
		});

		return data;
	} catch (error) {
		console.log(error.message);
	}
};

export const updateAccount = async (id, values) => {
	try {
		await axios({
			method: "put",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			url: `account/${id}`,
			data: {
				...values,
			},
		});
		return "success";
	} catch (error) {
		console.log(error.message);
	}
};
