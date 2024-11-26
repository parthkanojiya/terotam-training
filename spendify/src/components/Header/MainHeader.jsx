import React, { useContext, useState } from "react";
import "./style.less";
import "../../global.less";
import { Button, Flex, Input, Select, Space } from "antd";
import { Col, Row } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import searchIcon from "../../assets/search.svg";
import { LightMode, DarkMode } from "../../utils/constants.jsx";
import ThemeContext from "../../themeContext.jsx";

const MainHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

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

          <Flex gap="small">
            <Button type="primary" disabled>
              Logout
            </Button>
          </Flex>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
