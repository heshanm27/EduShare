import { createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import CustomDrawer from "../Components/Drawer/CustomDrawer";

import Landing from "../Pages/Landing/Landing";
import NotFound from "../Pages/NotFound/NotFound";
import EducationalOrg from "../Pages/Organization/Educational/Educational";
import DonationOrg from "../Pages/Organization/Donation/Donation";
import VoluntterOrg from "../Pages/Organization/Voluntter/Voluntter";
import Organization from "../Pages/Organization/Organization";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp.js/SignUp";
import UserProfile from "../Pages/UserProfile/UserProfile";
import ProtetedRoute from "./ProtetedRoute";
import Qualifications from "../Pages/Admin/Qualifications/Qualifications";
import InterestedAreas from "../Pages/Admin/InterestedAreas/InterestedAreas";
import AdminReports from "../Pages/Admin/Reports/AdminReports";

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
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<ProtetedRoute />}>
          <Route path="/user" element={<UserProfile />} />

          {/* adminRoute */}
          <Route element={<CustomDrawer />}>
            <Route element={<ProtetedRoute roleRequired="admin" />}>
              <Route path="/qualifications" element={<Qualifications />} />
              <Route path="/interested" element={<InterestedAreas />} />
              <Route path="/report" element={<AdminReports />} />
            </Route>

            {/* Organization route */}
            <Route element={<ProtetedRoute roleRequired="org" />}>
              <Route path="/edu" element={<EducationalOrg />} />
              <Route path="/don" element={<DonationOrg />} />
              <Route path="/vol" element={<VoluntterOrg />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
