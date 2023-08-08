import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../store";
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";

export default function LoginRequiredRoute({ children }) {
  const {
    store: { isAuthenticated },
  } = useAppContext();

  if (isAuthenticated) {
    return children;
  }

  notification.open({
    message: "로그인이 필요합니다!",
    icon: <FrownOutlined style={{ color: "#ff3333" }} />
  });

  

  return (
    <Navigate
      to={{
        pathname: "/user/login",
        state: { from: "/protected" },
      }}
    />
  );
}