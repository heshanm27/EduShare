import React from "react";
import { Outlet } from "react-router";
import Login from "../Pages/SignIn/SignIn";
export default function OrganizationProtetedRoute() {
  const user = localStorage.getItem("user");
  const userType = user === "org" ? true : false;
  return userType ? <Outlet /> : <Login />;
}
