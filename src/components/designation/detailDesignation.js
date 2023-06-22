import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Popover } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDesignation } from "../../redux/actions/designation/deleteDesignationAction";
import { loadSingleDesignation } from "../../redux/actions/designation/detailDesignationAction";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import UserListCard from "./List/UserListCard";
//PopUp

const DetailDesignation = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();
  const designation = useSelector((state) => state.designations.designation);

  //Delete Supplier
  const onDelete = () => {
    try {
      dispatch(deleteDesignation(id));

      setVisible(false);
      toast.warning(`Designation : ${designation.name} is removed `);
      return navigate("/designation");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete Supplier PopUp
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  useEffect(() => {
    dispatch(loadSingleDesignation(id));
  }, [id]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=" Back " subtitle=" " />

      <div className="mr-top">
        {designation ? (
          <Fragment key={designation.id}>
            <Card bordered={false} style={{}}>
              <div
                className="card-header d-flex justify-content-between"
                style={{ padding: 0 }}
              >
                <div className="w-50">
                  <h5>
                    <i className="bi bi-person-lines-fill"></i>
                    <span className="mr-left">
                      ID : {designation.id} | {designation.name}
                    </span>
                  </h5>
                </div>
                <div className="text-end w-50">
                  <Link
                    className="me-3 d-inline-block"
                    to={`/designation/${designation.id}/update`}
                    state={{ data: designation }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<EditOutlined />}
                    ></Button>
                  </Link>
                  <Popover
                    content={
                      <a onClick={onDelete}>
                        <Button type="primary" danger>
                          Yes Please !
                        </Button>
                      </a>
                    }
                    title="Are you sure you want to delete ?"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                  >
                    <Button
                      type="danger"
                      DetailDesignation
                      shape="round"
                      icon={<DeleteOutlined />}
                    ></Button>
                  </Popover>
                </div>
              </div>

              <UserListCard list={designation?.user} />
            </Card>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailDesignation;
