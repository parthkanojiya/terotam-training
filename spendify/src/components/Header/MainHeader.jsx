import React, { useContext, useEffect, useState } from "react";
import "./style.less";
import "../../global.less";
import { Button, Flex, Input, Select, Space } from "antd";
import { Col, Row } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import searchIcon from "../../assets/search.svg";
import { LightMode, DarkMode } from "../../utils/constants.jsx";
import ThemeContext from "../../themeContext.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";

const MainHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName } = user;
        const userDetails = { email, displayName };
        localStorage.setItem("userData", JSON.stringify(userDetails));
        setUserData(userDetails);
        navigate("/home");
      } else {
        localStorage.removeItem("userData");
        setUserData(null);
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userData");
        setUserData(null);
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <header>
      <div className="header-wrapper">
        <div className="search-wrapper flex item-center gap-4">
          <div className="search-bar">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Search
                placeholder="Search transactions"
                allowClear
                // onSearch={onSearch}
              />
            </Space>
          </div>
          <button className="light-dark-btn" onClick={toggleTheme}>
            {theme === "dark" ? <LightMode /> : <DarkMode />}
          </button>
          <span>
            {userData?.displayName ? `Welcome, ${userData.displayName}!` : ""}
          </span>
          <Flex gap="small">
            <Button type="primary" onClick={handleSignOut}>
              Logout
            </Button>
          </Flex>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
