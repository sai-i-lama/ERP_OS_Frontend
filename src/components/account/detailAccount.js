import { Card } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleAccount } from "../../redux/actions/account/detailAccountAction";

import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import UpdateAccount from "./updateAccount";

const DetailAccount = () => {
	// const [data, setData] = useState(null);
	const data = useSelector((state) => state.accounts.account);
	const { id } = useParams("id");
	const dispatch = useDispatch();
	//make a use effect to get the data from the getTrailBalance function
	useEffect(() => {
		// getSubAccount(id).then((data) => {
		// 	setData(data);
		// });
		dispatch(loadSingleAccount(id));
	}, []);

	return (
		<>
			<PageTitle title={"Back"} />
			<br />
			<Card>
				{data ? (
					<div className='card-custom card-body'>
						<div className='card-title d-flex justify-content-between'>
							<h5>
								<i className='bi bi-card-list'>
									<span className='ms-2'> Account Details: {data.name}</span>{" "}
								</i>
							</h5>
							<UpdateAccount account={data?.name} id={id} />
						</div>
						<table className='table detail-account-table'>
							<thead className='thead-dark'>
								<tr>
									<th scope='col'>Debit</th>
									<th scope='col'>Credit</th>
									<th scope='col'> Perticulars</th>
									<th scope='col'> Date</th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data?.debit?.map((item, index) => {
										return (
											<tr>
												<td>{item.amount}</td>
												<td></td>
												<td>{item.particulars}</td>
												<td>{moment(item.date).format("YYYY-MM-DD")}</td>
											</tr>
										);
									})}
								{data &&
									data?.credit?.map((item, index) => {
										return (
											<tr>
												<td></td>
												<td>{item.amount}</td>
												<td>{item.particulars}</td>
												<td>{moment(item.date).format("YYYY-MM-DD")}</td>
											</tr>
										);
									})}

								{data && (
									<tr className='text-center'>
										<td colspan='2' class='table-active '>
											<strong>Balance</strong>
										</td>
										<td>
											<strong>{data?.balance}</strong>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				) : (
					<Loader />
				)}
			</Card>
		</>
	);
};

export default DetailAccount;
