import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, Spin, Flex } from "antd";
const { Header, Sider, Content } = Layout;
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./global.less";

// Components
import MainHeader from "./components/Header/MainHeader";
import Home from "./components/Home/Home";
import Incomes from "./Pages/Incomes/Incomes";
import Expenses from "./Pages/Expenses/Expenses";
import Transactions from "./Pages/Transactions/Transactions";
import Dashboard from "./components/Dashboard/Dashboard";
import Categories from "./Pages/Categories/Categories";
import Login from "./Pages/Login/Login";

// Icons
import { FaHome } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setCollapsed(true);
      } else {
        setIsMobile(false);
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", checkIfMobile);

    checkIfMobile();

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
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
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          transition: "transform 0.3s ease",
          transform: collapsed ? "translateX(-100%)" : "translateX(0)",
          zIndex: 999,
        }}
      >
        {/* Sidebar open/close button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="ant-btn css-dev-only-do-not-override-apn68 ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-icon-only"
          style={{
            fontSize: "16px",
            width: "64px",
            height: "64px",
            position: "absolute",
            right: "-3rem",
            color: "white",
          }}
        >
          <span className="ant-btn-icon">
            <span
              role="img"
              aria-label="menu-fold"
              className="anticon anticon-menu-fold"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="menu-fold"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"></path>
              </svg>
            </span>
          </span>
        </button>

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
          defaultSelectedKeys={window.location.pathname}
          onClick={({ key }) => navigate(key)}
          items={[
            { key: "/", icon: <FaHome />, label: "Home" },
            { key: "dashboard", icon: <MdDashboard />, label: "Dashboard" },
            { key: "categories", icon: <BiCategoryAlt />, label: "Categories" },
            { key: "incomes", icon: <GiReceiveMoney />, label: "Incomes" },
            { key: "expenses", icon: <GiPayMoney />, label: "Expenses" },
            {
              key: "transactions",
              icon: <CiViewList />,
              label: "Transactions",
            },
          ]}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: !isMobile && !collapsed ? 250 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderBottom: "1px solid #d9d9d9",
          }}
        >
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
