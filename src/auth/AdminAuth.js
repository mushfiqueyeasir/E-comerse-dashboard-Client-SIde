import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function AdminAuth({ user, children }) {
  const location = useLocation();
  if (user.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default AdminAuth;
