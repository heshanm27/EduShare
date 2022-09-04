import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import UserNavBar from "../../Components/UserNavBar/UserNavBar";

export default function UserFeeds() {
  return (
    <>
      <UserNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 20 }}>
        <Outlet />
      </Box>
    </>
  );
}
