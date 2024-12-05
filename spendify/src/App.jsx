import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Spin, Flex } from "antd";
const { Header, Sider, Content } = Layout;
import {
  Routes,
  Route,
  Link,
  useNavigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
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
import Login from "./Pages/Login/Login";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  if (!authChecked) {
    return (
      <Flex style={contentStyle} fullscreen="true">
        <Spin size="large"></Spin>
      </Flex>
    );
  }

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
            alignItems: "center",
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
            margin: "14px",
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
