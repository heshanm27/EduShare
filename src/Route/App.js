import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Landing/Home/Home";
import Landing from "../Pages/Landing/Landing";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp.js/SignUp";
import AdminProtetedRoute from "./AdminProtetedRoute";
import OrganizationProtetedRoute from "./OrganizationProtetedRoute";
import UserProtectedRoute from "./UserProtectedRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#094067",
      contrastText: "#fff",
    },
    secondary: {
      main: "#3da9fc",
      light: "#b3e5fc",
      contrastText: "#fff",
    },
    text: {},
  },
});

function App() {
  const loader = document.querySelector(".centerdiv");

  const hideLoader = () => {
    console.log(loader);
    loader.style.display = "none";
  };
  window.addEventListener("load", hideLoader);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<UserProtectedRoute />}>
          <Route path="/landing" element={<Home />} />
        </Route>
        <Route element={<AdminProtetedRoute />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route element={<OrganizationProtetedRoute />}>
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
