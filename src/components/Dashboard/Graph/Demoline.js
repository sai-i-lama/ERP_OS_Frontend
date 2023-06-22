import { Line } from "@ant-design/plots";
import { Card, DatePicker } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../../../redux/actions/dashboard/getDashboardDataAction";
import { loadAllPurchase } from "../../../redux/actions/purchase/getPurchaseAction";
import { loadAllSale } from "../../../redux/actions/sale/getSaleAction";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import Loader from "../../loader/loader";

const DemoLine = () => {
	//Date fucntinalities
	const [startdate, setStartdate] = useState(moment().startOf("month"));
	const [enddate, setEnddate] = useState(moment().endOf("month"));
	const dispatch = useDispatch();

	const data = useSelector((state) => state.dashboard.list?.saleProfitCount);
	const cardInformation = useSelector(
		(state) => state.dashboard.list?.cardInfo
	);

	const { RangePicker } = DatePicker;

	useEffect(() => {
		dispatch(loadDashboardData({ startdate, enddate }));
		dispatch(
			loadAllPurchase({
				page: 1,
				limit: 10,
				startdate: startdate,
				enddate: enddate,
			})
		);
		dispatch(
			loadAllSale({
				page: 1,
				limit: 10,
				startdate: startdate,
				enddate: enddate,
				user: "",
			})
		);
	}, []);

	const onCalendarChange = (dates) => {
		const newStartdate = (dates?.[0]).format("YYYY-MM-DD");
		const newEnddate = (dates?.[1]).format("YYYY-MM-DD");

		setStartdate(newStartdate ? newStartdate : startdate);
		setEnddate(newEnddate ? newEnddate : enddate);
		dispatch(
			loadDashboardData({
				startdate: newStartdate,
				enddate: newEnddate,
			})
		);

		dispatch(
			loadAllPurchase({
				page: 1,
				limit: 10,
				startdate: newStartdate,
				enddate: newEnddate,
			})
		);

		dispatch(
			loadAllSale({
				page: 1,
				limit: 10,
				startdate: newStartdate,
				enddate: newEnddate,
				user: "",
			})
		);
	};

	const config = {
		data,
		xField: "date",
		yField: "amount",
		seriesField: "type",
		yAxis: {
			label: {
				formatter: (v) => `${v / 1000} K`,
			},
		},
		legend: {
			position: "top",
		},
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 5000,
			},
		},
	};

	return (
		<Fragment>
			<div className='mb-3 mt-3 w-full' style={{ maxWidth: "25rem" }}>
				<RangePicker
					onCalendarChange={onCalendarChange}
					defaultValue={[startdate, enddate]}
					className='range-picker'
				/>
			</div>

			<NewDashboardCard information={cardInformation} />

			<Card title='Sales vs Profit'>
				{data ? <Line {...config} /> : <Loader />}
			</Card>
		</Fragment>
	);
};

export default DemoLine;
