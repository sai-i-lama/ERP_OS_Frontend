import { PageHeader } from "antd";
import React, { Fragment } from "react";
import "./page-header.css";

function PageTitle({ title, subtitle }) {
  return (
    <Fragment>
      <PageHeader
        className="site-page-header d-lg-block"
        onBack={() => window.history.back()}
        title={<b className="page-title">{title}</b>}
        subTitle={<b className="subtitle">{subtitle}</b>}
      />
    </Fragment>
  );
}

export default PageTitle;
