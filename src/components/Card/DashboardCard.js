import React, { Fragment } from "react";

import "./card.css";

const DashboardCard = ({ information, count, isCustomer, title }) => {
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="">{count?.id ? count?.id : 0}</h3>
                      <span className="">Invoice</span>
                    </div>
                    <div className="align-self-center">
                      <i className="icon-cloud-download font-large-2 float-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card dashboard-card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="media-body text-left">
                      <h3 className="">
                        {information?.total_amount
                          ? information?.total_amount
                          : 0}
                      </h3>
                      <span className="">Total Amount</span>
                    </div>
                    <div className="align-self-center">
                      <i className="icon-rocket font-large-2 float-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isCustomer ? (
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">
                          {information?.profit ? information?.profit : 0}
                        </h3>
                        <span className="">Total Profit</span>
                      </div>
                      <div className="align-self-center">
                        <i className="icon-wallet  font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">
                          {information?.paid_amount
                            ? information?.paid_amount
                            : 0}
                        </h3>
                        <span className="">Paid Amount</span>
                      </div>
                      <div className="align-self-center">
                        <i className="icon-wallet  font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCustomer ? (
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">
                          {information?.paid_amount
                            ? information?.paid_amount
                            : 0}
                        </h3>
                        <span
                          className="strong "
                          style={{ fontSize: "12px", fontWeight: "bold" }}>
                          Paid Amount{" "}
                        </span>
                      </div>
                      <div className="media-body text-right">
                        <h3 className="">
                          {information?.due_amount
                            ? information?.due_amount
                            : 0}
                        </h3>
                        <span
                          className="strong"
                          style={{ fontSize: "12px", fontWeight: "bold" }}>
                          Due Amount{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card dashboard-card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <h3 className="">
                          {information?.due_amount
                            ? information?.due_amount
                            : 0}
                        </h3>
                        <span className="">Total Due</span>
                      </div>
                      <div className="align-self-center">
                        <i className="icon-pie-chart font-large-2 float-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardCard;
