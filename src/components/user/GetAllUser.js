import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./user.css";

import { Button, Dropdown, Menu, Segmented, Table } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import GetTotalCustomers from "../../api/getTotalCustomers";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";

function CustomTable({ list }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("true");
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Link to={`/hr/staffs/${id}/`}>
          <button className="btn btn-dark btn-sm"> View</button>
        </Link>
      ),
    },
  ];

  //make a onChange function
  const onChange = (value) => {
    setStatus(value);
    dispatch(loadAllStaff({ status: value }));
  };

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

  return (
    <div>
      <div className="d-flex my-2">
        <div className="w-50">
          <h4>Staff List</h4>
        </div>
        {list && (
          <div className="text-center d-flex justify-content-end w-50">
            <div className="me-2">
              <CSVLink
                data={list}
                className="btn btn-dark btn-sm"
                style={{ marginTop: "5px" }}
                filename="staffs"
              >
                Download CSV
              </CSVLink>
            </div>

            <div>
              <Segmented
                className="text-center rounded danger"
                size="middle"
                options={[
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-lines-fill"></i> Active
                      </span>
                    ),
                    value: "true",
                  },
                  {
                    label: (
                      <span>
                        <i className="bi bi-person-dash-fill"></i> Inactive
                      </span>
                    ),
                    value: "false",
                  },
                ]}
                value={status}
                onChange={onChange}
              />
            </div>
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
        }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

const GetAllCust = (props) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.users.list);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(loadAllStaff({ status: "true" }));
  }, []);

  useEffect(() => {
    GetTotalCustomers().then((res) => setTotal(res));
  }, [list]);

  // useEffect(() => {
  //   deleteHandler(list, deletedId);
  // }, [deletedId, list]);

  return (
    <div className="card card-custom">
      <div className="card-body">
        <CustomTable list={list} total={total} />
      </div>
    </div>
  );
};

export default GetAllCust;
