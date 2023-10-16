import React, { useContext } from "react";
import AuthContext from "../context/Auth-Context";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const ctx = useContext(AuthContext);

  if (!ctx.isLoggedIn) {
    return <Navigate to="/login"></Navigate>;
  }
  return props.children;
}
