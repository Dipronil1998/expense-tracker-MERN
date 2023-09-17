import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 72
    }}
    spin
  />
);

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh" // Set the container height to fill the viewport
    }}
  >
    <Spin indicator={antIcon} />
  </div>
);

export default Loader;
