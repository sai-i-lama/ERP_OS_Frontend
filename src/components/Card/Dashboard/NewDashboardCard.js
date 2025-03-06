import React, { Fragment } from "react";
import "./style.css";

const NewDashboardCard = ({ information }) => {
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
                        {information?.sale_totalMP
                          ? information?.sale_totalMP
                          : 0}
                      </h3>
                      <span className="">Total Achat</span>
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
                      <h3 className="dark">
                        {information?.sale_total ? information?.sale_total : 0}
                      </h3>
                      <span className="dark">Total Vente</span>
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
                      <h3 className="dark">
                        {information?.sale_profit
                          ? information?.sale_profit
                          : 0}
                      </h3>
                      <span className="dark">Bénéfice total</span>
                    </div>
                    <div className="align-self-center">
                      <i className="icon-wallet font-large-2 float-right"></i>
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
                      <h3 className="dark">
                        {information?.sale_countMP
                          ? information?.sale_countMP
                          : 0}
                      </h3>
                      <span
                        className="strong dark"
                        style={{ fontSize: "14px", fontWeight: "" }}>
                        Facture d’achat{" "}
                      </span>
                    </div>
                    <div className="media-body text-right">
                      <h3 className="dark">
                        {information?.sale_count ? information?.sale_count : 0}
                      </h3>
                      <span
                        className="strong dark"
                        style={{ fontSize: "14px", fontWeight: "" }}>
                        Facture de vente{" "}
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

export default NewDashboardCard;
