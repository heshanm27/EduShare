import React from "react";

import { Outlet } from "react-router";
import Login from "../Pages/SignIn/SignIn";

export default function UserProtectedRoute() {
  const user = localStorage.getItem("user");
  const userType = user === "user" ? true : false;
  return userType ? <Outlet /> : <Login />;
}
