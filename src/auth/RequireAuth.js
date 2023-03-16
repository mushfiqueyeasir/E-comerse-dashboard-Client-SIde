import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getToken } from "../utility/Constant";

function RequireAuth({ children }) {
  const [user] = getToken();
  const location = useLocation();

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
