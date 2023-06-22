import { Card, Col, Row } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import checkTokenExp from "../../../utils/checkTokenExp";

import DemoBar from "./DemoBar";
import DemoLine from "./Demoline";
import DemoPie from "./DemoPie";

const Dashboard = () => {
	const isLogged = Boolean(localStorage.getItem("isLogged"));

	if (!isLogged) {
		return <Navigate to={"/auth/login"} replace={true} />;
	}

	//Looging Out if token is expried

	const accessToken = localStorage.getItem("access-token");
	checkTokenExp(accessToken);
	return (
		<>
			<div>
				<div>
					<div className='mb-3'>
						<Row>
							<Col span={24}>
								<DemoLine />
							</Col>
						</Row>
					</div>
					<div>
						<Row gutter={[30, 30]}>
							<Col sm={24} md={24} lg={12} span={24}>
								<Card title='Sale VS Purchase'>
									<DemoPie />
								</Card>
							</Col>

							<Col sm={24} md={24} lg={12} span={24}>
								<Card title='Most buying customer by sales and profit'>
									<DemoBar />
								</Card>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
