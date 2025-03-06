import React, { useEffect, useState } from "react";
import { Card, DatePicker, Form, Button, Select, Table, Segmented } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PageTitle from "../page-header/PageHeader";
import AuditLogPrint from "./AuditLogPrint";
import Loader from "../loader/loader";
import loadAllLogs from "../../redux/actions/auditLogs/getLogsAction";

const GetAllAudiLogs = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logs.list);
  const total = useSelector((state) => state.logs.total);
  const [user, setUser] = useState("");
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").toISOString()
  );
  const [endDate, setEndDate] = useState(moment().endOf("month").toISOString());
  const state = useSelector((state) => state);
  console.log("Complete state:", state);
  console.log("Logs from state:", logs);
  console.log("Total logs count:", total);

  const columns = [
    { title: "ID", dataIndex: "id", align:"center", key: "id" },
    { title: "Action", dataIndex: "action", align:"center", key: "action" },
    {
      title: "Utilisateur",
      key: "user_or_customer",
      align:"center",
      render: (text, record) => {
        if (record.user && record.user.username) {
          return record.user.username;
        } else if (record.customer && record.customer.username) {
          return record.customer.username;
        } else {
          return "N/A";
        }
      }
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      align:"center",
      key: "timestamp",
      render: (text) => new Date(text).toLocaleString()
    }
  ];

  useEffect(() => {
    dispatch(
      loadAllLogs({
        page: 1,
        limit: count,
        startdate: startDate,
        enddate: endDate
      })
    );
  }, [dispatch, count, startDate, endDate]);

  const onSearchFinish = async (values) => {
    setUser(values?.user || "");
    setLoading(true);

    if (startDate && endDate) {
      await dispatch(
        loadAllLogs({
          page: 1,
          limit: count,
          startdate: startDate,
          enddate: endDate
        })
      );
    } else {
      console.error("Les dates de début et de fin ne sont pas définies.");
    }

    setLoading(false);
  };

  const onSwitchChange = (value) => {
    setCount(value);
    dispatch(
      loadAllLogs({
        page: 1,
        limit: value,
        startdate: startDate,
        enddate: endDate
      })
    );
  };

  const onCalendarChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      const newStartDate = dates[0].format("YYYY-MM-DDTHH:mm:ss");
      const newEndDate = dates[1].format("YYYY-MM-DDTHH:mm:ss");
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    } else {
      console.error("Les dates sélectionnées sont nulles ou non définies.");
    }
  };

  console.log("Logs from state:", logs);

  return (
    <>
      <PageTitle title={"Retour"} subtitle={"JOURNAL DE L'ACTIVITÉ"} />
      <br />
      <Card>
        <div className="card-title d-flex flex-column flex-md-row align-items-center justify-content-md-center mt-1 py-2">
          <Form onFinish={onSearchFinish} layout={"inline"}>
            <Form.Item name="user">
              <Select
                placeholder="Utilisateur"
                style={{ width: 200 }}
                allowClear
              >
                <Select.Option value="">Tous</Select.Option>
                {/* Ajouter les options des utilisateurs ici */}
              </Select>
            </Form.Item>
            <Form.Item>
              <DatePicker.RangePicker
                onCalendarChange={onCalendarChange}
                defaultValue={[
                  moment().startOf("month"),
                  moment().endOf("month")
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => setLoading(true)}
                loading={loading}
                type="primary"
                htmlType="submit"
              >
                <SearchOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Segmented
          size="middle"
          options={[
            { label: "Toute", value: total },
            { label: "Paginé", value: 10 }
          ]}
          value={count}
          onChange={onSwitchChange}
        />
        <div className="text-end">
          <AuditLogPrint data={logs} />
        </div>
        <Table
          scroll={{ x: true }}
          loading={loading}
          pagination={{
            pageSize: count || 50,
            pageSizeOptions: [10, 20, 50, 100, 200],
            showSizeChanger: true,
            total: total,
            onChange: (page, limit) => {
              dispatch(
                loadAllLogs({
                  page,
                  limit,
                  startdate: startDate,
                  enddate: endDate,
                  user
                })
              );
            }
          }}
          columns={columns}
          dataSource={logs.map((log) => ({ ...log, key: log.id }))} // Assurez-vous que les logs ne sont pas `undefined`
          onChange={(pagination, filters, sorter, extra) => {
            console.log("Table changed:", {
              pagination,
              filters,
              sorter,
              extra
            });
          }}
        />
      </Card>
    </>
  );
};

export default GetAllAudiLogs;
