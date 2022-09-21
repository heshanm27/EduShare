import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import CustomDrawer from "../Components/Drawer/CustomDrawer";

import Landing from "../Pages/Landing/Landing";
import NotFound from "../Pages/NotFound/NotFound";
import EducationalOrg from "../Pages/Organization/Educational/Educational";
import DonationOrg from "../Pages/Organization/Donation/Donation";
import VoluntterOrg from "../Pages/Organization/Voluntter/Voluntter";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp.js/SignUp";
import ProtetedRoute from "./ProtetedRoute";
import UserManage from "../Pages/Admin/UserManage/UserManage";
import InterestedAreas from "../Pages/Admin/InterestedAreas/InterestedAreas";
import AdminReports from "../Pages/Admin/Reports/AdminReports";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../FireBase/Config";
import { setCurruentUser, unsetCurruntUser } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserEduFeed from "../Pages/User/UserEduFeed/UserEduFeed";
import UserEduApplyForm from "../Components/Forms/UserEduApplyForm/UserEduApplyForm";
import UserNavBar from "../Components/UserNavBar/UserNavBar";
import UserDonFeed from "../Pages/User/UserDonFeed/UserDonFeed";
import UserVonFeed from "../Pages/User/UserVonFeed/UserVonFeed";
import SignUpRole from "../Pages/SignUp.js/SignUpRole/SignUpRole";
import EduResponse from "../Pages/Organization/Responses/EduResponse/EduResponse";
import EduSummary from "../Pages/Organization/Summary/EduSummary/EduSummary";
import UserProfile from "../Pages/UserProfile/UserProfile";
import EduReport from "../Pages/Organization/Report/EduReport/EduReport";
const theme = createTheme({
  palette: {
    primary: {
      main: "#094067",
      contrastText: "#fff",
    },
    secondary: {
      main: "#0071F2",
      light: "#2D9CDB",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 400,
    fontWeightBold: 700,
    fontWeightRegular: 400,
  },
});

function App() {
  const loader = document.querySelector(".centerdiv");
  const dispatch = useDispatch();
  const { curruntUser } = useSelector((state) => state.user);
  const hideLoader = () => {
    console.log(loader);
    loader.style.display = "none";
  };
  window.addEventListener("load", hideLoader);

  const routeChangeToUSer = () => {
    switch (curruntUser?.role) {
      case "admin":
        return "/interested";
      case "org":
        return "/edu";
      case "user":
        return "/eduFeed";
      default:
        return "/";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const UserDetails = {};
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          UserDetails.id = user.uid;
          UserDetails.name =
            docSnap.data().firstName + " " + docSnap.data().lastName;
          UserDetails.phoneNo = docSnap.data().phoneNo;
          UserDetails.educationLevel = docSnap.data().education;
          UserDetails.email = user.email;
          UserDetails.image = docSnap.data().img;
          UserDetails.role = docSnap.data().userRole;
        }

        dispatch(setCurruentUser(UserDetails));
      } else {
        dispatch(unsetCurruntUser(user));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/roles" element={<SignUpRole />} />
          <Route
            path="/signin"
            element={
              curruntUser ? <Navigate to={routeChangeToUSer()} /> : <SignIn />
            }
          />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route element={<ProtetedRoute />}>
            <Route element={<ProtetedRoute roleRequired="user" />}>
              <Route element={<UserNavBar />}>
                <Route path="/edufeed" element={<UserEduFeed />} />
                <Route path="/donfeed" element={<UserDonFeed />} />
                <Route path="/vonfeed" element={<UserVonFeed />} />
                <Route
                  path="/edufeed/eduform/:id"
                  element={<UserEduApplyForm />}
                />
              </Route>
            </Route>
            {/* adminRoute */}
            <Route element={<CustomDrawer />}>
              <Route element={<ProtetedRoute roleRequired="admin" />}>
                <Route path="/usercontrol" element={<UserManage />} />
                <Route path="/interested" element={<InterestedAreas />} />
                <Route path="/report" element={<AdminReports />} />
              </Route>

              {/* Organization route */}
              <Route element={<ProtetedRoute roleRequired="org" />}>
                <Route path="/edu" element={<EducationalOrg />} />
                <Route path="/edu/response" element={<EduResponse />} />
                <Route path="/edu/summary" element={<EduSummary />} />
                <Route path="/edu/summary/report" element={<EduReport />} />

                <Route path="/don" element={<DonationOrg />} />
                <Route path="/don/response" element={<DonationOrg />} />
                <Route path="/don/summary" element={<DonationOrg />} />
                <Route path="/vol" element={<VoluntterOrg />} />
                <Route path="/vol/response" element={<VoluntterOrg />} />
                <Route path="/vol/summary" element={<VoluntterOrg />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
