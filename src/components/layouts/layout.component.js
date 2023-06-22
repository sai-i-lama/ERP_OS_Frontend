import {
  BranchesOutlined,
  SaveOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import "./layouts.css";
import { NavLink, Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const HomeLayout = ({ children }) => (
  <Layout>
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <div className='logo '>
        <Link to='/'>
          <h3 className='style-layout'>Smart ERP V1</h3>
        </Link>
      </div>

      <br />
      <br />
      <Menu
        theme='dark'
        mode='inline'
        items={[
          {
            key: 1,
            label: <NavLink to={"/supplier"}>Suppliers</NavLink>,
            icon: <BranchesOutlined />,
          },
          {
            key: 2,
            label: <NavLink to={"/product"}>Products</NavLink>,
            icon: <SaveOutlined />,
          },
          {
            key: 3,
            label: <NavLink to={"/purchase"}>Purchase New</NavLink>,
            icon: <AppstoreAddOutlined />,
          },
          {
            key: 4,
            label: <NavLink to={"/users"}>User List</NavLink>,
            icon: <AppstoreAddOutlined />,
          },
        ]}
      />
    </Sider>
    <Layout>
      <Header
        className='site-layout-sub-header-background'
        style={{
          padding: 0,
        }}
      />
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div
          className='site-layout-background'
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Omega Solution ©2022 Smart ERP
      </Footer>
    </Layout>
  </Layout>
);

export default HomeLayout;
