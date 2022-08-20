import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export default function CustomAvatar() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 150, height: 150 }}
      />
      <Typography align="center" variant="h5" component="h2">
        Name
      </Typography>
    </Stack>
  );
}
