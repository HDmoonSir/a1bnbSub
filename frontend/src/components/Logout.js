import React, { useEffect } from "react";
import { useAppContext, deleteToken } from "../store";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(deleteToken());
    navigate("/");
  }, [dispatch, navigate]);
}