import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";

export default function ProtetedRoute({ roleRequired }) {
  const location = useLocation();
  const auth = localStorage.getItem("user");
  const roleType = localStorage.getItem("user");

  const CheckRole = (role) => {
    return role === roleType ? (
      <Outlet />
    ) : (
      <Navigate to="/signIn" state={{ from: location }} replace />
    );
  };

  if (roleRequired) {
    return auth ? (
      CheckRole(roleRequired)
    ) : (
      <Navigate to="/signIn" state={{ from: location }} replace />
    );
  } else {
    return auth ? (
      <Outlet />
    ) : (
      <Navigate to="/signIn" state={{ from: location }} replace />
    );
  }
}
