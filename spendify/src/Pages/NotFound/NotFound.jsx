import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const NotFound = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: "100dvh",
    }}
  >
    <Result
      status="404"
      title={<span style={{ color: "var(--text-color)" }}>404</span>}
      subTitle={
        <span style={{ color: "var(--text-color)" }}>
          Sorry, the page you visited does not exist.
        </span>
      }
      style={{ color: "var(--text-color)" }}
      extra={
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  </div>
);
export default NotFound;
