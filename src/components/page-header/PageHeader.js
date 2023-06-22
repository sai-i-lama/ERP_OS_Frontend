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
        subTitle={subtitle}
      />
    </Fragment>
  );
}

export default PageTitle;
