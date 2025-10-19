import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const AdminRouters = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/adminlogin" state={{ from: location }} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default AdminRouters;
