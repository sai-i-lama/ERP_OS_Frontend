import { PageHeader } from "antd";
import React, { Fragment } from "react";
import "./page-header.css";

function PageTitle({ title, subtitle }) {
  return (
    <Fragment>
      <PageHeader
        className="site-page-header d-none d-lg-block"
        onBack={() => window.history.back()}
        title={title}
        subTitle={<b className="subtitle">{subtitle}</b>}
      />
    </Fragment>
  );
}

export default PageTitle;
