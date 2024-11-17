import React from "react";
import "./style.less";
import "../../global.less";
import { Input, Select, Space } from "antd";
import { Col, Row } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import searchIcon from "../../assets/search.svg";

const MainHeader = () => {
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
          <button className="sign-in-up" disabled>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
