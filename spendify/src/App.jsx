import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./global.less";

// Components
import Sidebar from "./components/Sidebar/Sidebar";
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home/Home";
import Incomes from "./Pages/Incomes/Incomes";
import Expenses from "./Pages/Expenses/Expenses";
import Transactions from "./Pages/Transactions/Transactions";
import Dashboard from "./components/Dashboard/Dashboard";
import Categories from "./Pages/Categories/Categories";

// Icons
import { FaHome } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link to="/" className="demo-logo-vertical">
          <FcMoneyTransfer style={{ fontSize: "2rem", margin: "0.8rem" }} />
          {collapsed === true ? (
            ""
          ) : (
            <span className="logo-name">Spendify</span>
          )}
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          defaultSelectedKeys={window.location.pathname}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/",
              icon: <FaHome />,
              label: "Home",
            },
            {
              key: "dashboard",
              icon: <MdDashboard />,
              label: "Dashboard",
            },
            {
              key: "categories",
              icon: <BiCategoryAlt />,
              label: "Categories",
            },
            {
              key: "incomes",
              icon: <GiReceiveMoney />,
              label: "Incomes",
            },
            {
              key: "expenses",
              icon: <GiPayMoney />,
              label: "Expenses",
            },
            {
              key: "transactions",
              icon: <CiViewList />,
              label: "Transactions",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #d9d9d9",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <MainHeader />
        </Header>
        <Content
          style={{
            // margin: "24px 16px",
            margin: "14px",
            // padding: 12,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ContentRoutes>
            <Home />
          </ContentRoutes>
        </Content>
      </Layout>
    </Layout>
  );
}

function ContentRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/incomes" element={<Incomes />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
