import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Admin from "../Pages/AdminPanel/Admin";

import Landing from "../Pages/Landing/Landing";
import NotFound from "../Pages/NotFound/NotFound";
import Organization from "../Pages/Organization/Organization";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp.js/SignUp";
import UserProfile from "../Pages/UserProfile/UserProfile";
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
        <Route path="/home" element={<Landing />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/user" element={<UserProfile />} />
        </Route>
        <Route element={<AdminProtetedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<OrganizationProtetedRoute />}>
          <Route path="/org" element={<Organization />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
