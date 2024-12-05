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

const MainHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userData, setUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, displayName } = user;
        const userDetails = { email, displayName };
        localStorage.setItem("userData", JSON.stringify(userDetails));
        setUserData(userDetails);
        navigate("/");
      } else {
        localStorage.removeItem("userData");
        setUserData(null);
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userData");
        localStorage.removeItem("isLoggedIn");
        setUserData(null);
        navigate("/login");
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
          <button className="light-dark-btn" onClick={toggleTheme}>
            {theme === "dark" ? <LightMode /> : <DarkMode />}
          </button>
          <p className="display-name">
            {userData?.displayName ? (
              <span>
                Welcome,{" "}
                <b style={{ fontSize: "18px" }}>{userData.displayName}</b>
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
