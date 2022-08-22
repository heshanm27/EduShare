import React from "react";
import { Outlet, Navigate, useLocation } from "react-router";

export default function ProtetedRoute({ roleRequired }) {
  const location = useLocation();
  const auth = "org";
  const roleType = "admin";

  const CheckRole = (role) => {
    return role === roleType ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  };

  if (roleRequired) {
    return auth ? (
      CheckRole(roleRequired)
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  } else {
    return auth ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  }
}
