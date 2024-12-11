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
import UserContext from "../../UserContext.jsx";

import { useSelector, useDispatch } from "react-redux";
import { clearUserData, setUserData } from "../../redux/actions/userActions.js";

const MainHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userDetails = JSON.parse(storedUserData);
      dispatch(setUserData(userDetails));
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  const handleSignOut = () => {
    dispatch(clearUserData());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    localStorage.removeItem("categoryState");
    navigate("/login");
  };

  return (
    <header>
      <div className="header-wrapper">
        <div className="search-wrapper flex item-center gap-4">
          <button className="light-dark-btn" onClick={toggleTheme}>
            {theme === "dark" ? <LightMode /> : <DarkMode />}
          </button>
          <p className="display-name">
            {userData?.displayName ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                Welcome,{" "}
                <b style={{ fontSize: "14px" }}>{userData.displayName}</b>
              </span>
            ) : (
              ""
            )}
          </p>
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
