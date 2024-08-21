import React, { Fragment } from "react";

import "./card.css";

const DashboardCardByCus = ({ information, count }) => {
    console.log('Information reçue:', information);
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
                      <h3 className="">
                        {information?.saleCus_count
                          ? information?.saleCus_count
                          : 0}
                      </h3>
                      <span className="">Facture</span>
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
                        {information?.saleCus_total_amount
                          ? information?.saleCus_total_amount
                          : 0}
                      </h3>
                      <span className="">Montant total</span>
                    </div>
                    <div className="align-self-center">
                      <i className="icon-rocket font-large-2 float-right"></i>
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
                        {information?.saleCus_paid_amount
                          ? information?.saleCus_paid_amount
                          : 0}
                      </h3>
                      <span className="">Montant payé </span>
                    </div>
                    <div className="align-self-center">
                      <i className="icon-wallet  font-large-2 float-right"></i>
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
                    <div className="media-body text-right">
                      <h3 className="">
                        {information?.saleCus_due_amount
                          ? information?.saleCus_due_amount
                          : 0}
                      </h3>
                      <span
                        className="strong"
                        style={{ fontSize: "14px", fontWeight: "" }}
                      >
                        Montant à payer{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
      
    </Fragment>
    
  );
};

export default DashboardCardByCus;
