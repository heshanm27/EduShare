import React from "react";
import { Outlet } from "react-router";
import Login from "../Pages/SignIn/SignIn";
export default function AdminProtetedRoute() {
  const user = localStorage.getItem("user");

  const userType = user === "admin" ? true : false;
  return userType ? <Outlet /> : <Login />;
}
