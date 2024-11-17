import React from "react";
import "./style.less";
import "../../global.less";
import { Input, Select, Space } from "antd";
import { Col, Row } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info);

const SearchBar = () => {
  return (
    <section className="searchbar-section">
      <div className="searchbar-wrapper">
        <Row style={{ alignItems: "center", padding: "4px 0" }} gutter={[8, 8]}>
          {/* Search Box */}
          <Col span={16}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Search
                placeholder="Search transactions"
                allowClear
                onSearch={onSearch}
              />
            </Space>
          </Col>

          {/* Select buttons */}
          <Col span={8}>
            <Space wrap style={{ width: "100%" }}>
              <Select
                style={{ width: "100%" }}
                defaultValue="All"
                // onChange={handleChange}

                options={[
                  { value: "all", label: "All" },
                  { value: "income", label: "Income" },
                  { value: "expense", label: "Expense" },
                ]}
              />
            </Space>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SearchBar;
