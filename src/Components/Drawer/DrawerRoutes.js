import AssessmentIcon from "@mui/icons-material/Assessment";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
export const EduOpportunitiesRoutes = [
  {
    label: "Manage",
    path: "/edu",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "Warrenty",
  },
  {
    label: "Summury",
    path: "/edusummury",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <AssessmentIcon />,
    component: "Reports",
  },
];

export const DonOpportunitiesRoutes = [
  {
    label: "Manage",
    path: "/don",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "Spare Parts",
  },
  {
    label: "Summury",
    path: "/donsummury",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <AssessmentIcon />,
    component: "Reports",
  },
];

export const VolOpportunitiesRoutes = [
  {
    label: "Manage",
    path: "/vol",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
  {
    label: "Summury",
    path: "/volsummury",
    icon: <AssessmentOutlinedIcon />,
    activeIcon: <AssessmentIcon />,
    component: "Reports",
  },
];

export const AdminRoutes = [
  {
    label: "Interested",
    path: "/interested",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "Reports",
  },
];

export const AdminUserRoutes = [
  {
    label: "Settings",
    path: "/usercontrol",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
];
export const AdminReportRoutes = [
  {
    label: "Reports",
    path: "/report",
    icon: <SettingsApplicationsOutlinedIcon />,
    activeIcon: <SettingsApplicationsIcon />,
    component: "vehicle",
  },
];
