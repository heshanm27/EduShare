import React from "react";
import { Outlet, Navigate } from "react-router";

import { useSelector } from "react-redux";
export default function ProtetedRoute({ roleRequired }) {
  const { curruntUser, isLoggedIn } = useSelector((state) => state.user);

  const auth = curruntUser;
  const roleType = "org";
  console.log("user", curruntUser?.role);
  const CheckRole = (role) => {
    return role === roleType ? <Outlet /> : <Navigate to="/signin" replace />;
  };

  if (roleRequired) {
    return auth ? CheckRole(roleRequired) : <Navigate to="/signin" replace />;
  } else {
    return auth ? <Outlet /> : <Navigate to="/signin" replace />;
  }
}
