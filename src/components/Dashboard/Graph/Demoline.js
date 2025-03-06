import { Column } from "@ant-design/plots";
import { Card, DatePicker, Col, Row } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardData } from "../../../redux/actions/dashboard/getDashboardDataAction";
import { loadAllPurchase } from "../../../redux/actions/purchase/getPurchaseAction";
import { loadAllSale } from "../../../redux/actions/sale/getSaleAction";
import Loader from "../../loader/loader";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import NotificationIcon from "../../notification/NotificationIcon";
import NotificationSystem from "../../notification/NewCommandeNotification";
import DemoBarC from "./DemoBarC";

const DemoLine = () => {
  const [list, setList] = useState([]);
  const [NewCommande, setNewCommande] = useState([]);

  const productsList = useSelector((state) => state.products.list);
  const Clientlist = useSelector((state) => state.sales.list);

  useEffect(() => {
    setList(productsList);
    setNewCommande(Clientlist);
  }, [productsList, Clientlist]);

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
        enddate: enddate
      })
    );
    dispatch(
      loadAllSale({
        page: 1,
        limit: 10,
        startdate: startdate,
        enddate: enddate,
        user: ""
      })
    );
  }, []);

  const onCalendarChange = (dates) => {
    const newStartdate = dates?.[0] ? dates[0].format("YYYY-MM-DD") : startdate;
    const newEnddate = dates?.[1] ? dates[1].format("YYYY-MM-DD") : enddate;

    setStartdate(newStartdate);
    setEnddate(newEnddate);

    dispatch(
      loadDashboardData({
        startdate: newStartdate,
        enddate: newEnddate
      })
    );

    dispatch(
      loadAllPurchase({
        page: 1,
        limit: 10,
        startdate: newStartdate,
        enddate: newEnddate
      })
    );

    dispatch(
      loadAllSale({
        page: 1,
        limit: 10,
        startdate: newStartdate,
        enddate: newEnddate,
        user: ""
      })
    );
  };

  const config = {
    data,
    xField: "date",
    yField: "amount",
    seriesField: "type",
    isGroup: true, // Affiche les barres côte à côte (groupées)
    columnWidthRatio: 0.2, // Largeur des barres
    yAxis: {
      label: {
        formatter: (v) => `${v / 1000} K`
      }
    },
    legend: {
      position: "top"
    },

    animation: {
      appear: {
        animation: "scale-in-y",
        duration: 1000
      }
    }
   
  };

  const user_id = localStorage.getItem("id");

  return (
    <Fragment>
      <div
        className="row d-flex"
        style={{ maxWidth: "100%", marginBottom: "10px" }}
      >
        <div className="col-md-3">
          <RangePicker
            onCalendarChange={onCalendarChange}
            defaultValue={[startdate, enddate]}
            className="range-picker"
          />
        </div>
        <div
          className="col-md-9"
          style={{ display: "flex", justifyContent: "flex-end", gap: "3%" }}
        >
          <NotificationSystem userId={user_id} />
          <NotificationIcon list={list} />
        </div>
      </div>

      <NewDashboardCard information={cardInformation} />

      <div className="mb-3">
        <Row gutter={[30, 30]}>
          <Col sm={24} md={24} lg={16} span={24}>
            <Card title="Ventes vs bénéfices">
              {data ? <Column {...config} /> : <Loader />}
            </Card>
          </Col>

          <Col sm={24} md={24} lg={8} span={24}>
            <Card title="Produits les plus vendus ">
              <DemoBarC />
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default DemoLine;
