import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "./account.css";

import { Button, Dropdown, Menu, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { loadAllAccount } from "../../redux/actions/account/getAccountAction";

//Date fucntinalities
let startdate = moment(new Date()).format("YYYY-MM-DD");
let enddate = moment(new Date()).add(1, "day").format("YYYY-MM-DD");

function CustomTable({ list, total }) {
  const dispatch = useDispatch();
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/account/${id}`}>{id}</Link>,
    },
    // {
    // 	title: "Date",
    // 	dataIndex: "date",
    // 	key: "date",
    // 	render: (date) => moment(date).format("ll"),
    // },

    {
      title: "Account",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Account Type ",
      dataIndex: "account",
      key: "account",
      render: (account) => account?.name,
      responsive: ["md"],
    },
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {
    const ifColFound = columnsToShow.find((item) => item.key === col.key);
    if (ifColFound) {
      const filteredColumnsToShow = columnsToShow.filter(
        (item) => item.key !== col.key
      );
      setColumnsToShow(filteredColumnsToShow);
    } else {
      const foundIndex = columns.findIndex((item) => item.key === col.key);
      const foundCol = columns.find((item) => item.key === col.key);
      let updatedColumnsToShow = [...columnsToShow];
      updatedColumnsToShow.splice(foundIndex, 0, foundCol);
      setColumnsToShow(updatedColumnsToShow);
    }
  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>,
    };
  });

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  const CSVlist = list?.map((i) => ({
    ...i,
    account: i?.account?.name,
  }));

  return (
    <div>
      <div className="text-end">
        {list && (
          <div>
            <CSVLink
              data={CSVlist}
              className="btn btn-dark btn-sm mb-1"
              filename="accounts"
            >
              Download CSV
            </CSVLink>
          </div>
        )}
      </div>

      {list && (
        <div style={{ marginBottom: "30px" }}>
          <Dropdown
            overlay={
              <Menu onClick={colVisibilityClickHandler} items={columnItems} />
            }
            placement="bottomLeft"
          >
            <Button className="column-visibility">Column Visibility</Button>
          </Dropdown>
        </div>
      )}

      <Table
        scroll={{ x: true }}
        loading={!list}
        pagination={{
          defaultPageSize: 20,
          pageSizeOptions: [10, 20, 50, 100, 200],
          showSizeChanger: true,

          onChange: (page, limit) => {
            dispatch(loadAllAccount());
          },
        }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

const GetAllAccount = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.accounts.list);

  useEffect(() => {
    dispatch(loadAllAccount());
  }, []);

  return (
    <div className="card card-custom">
      <div className="card-body">
        <div className="card-title d-flex justify-content-between">
          <h5>
            <span className="ms-2">Accounts</span>
          </h5>
        </div>
        <CustomTable list={list} startdate={startdate} enddate={enddate} />
      </div>
    </div>
  );
};

export default GetAllAccount;
