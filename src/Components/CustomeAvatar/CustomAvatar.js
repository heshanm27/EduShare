import { Box } from "@material-ui/core";
import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

export default function CustomAvatar({ key, name, image }) {
  return (
    <Box key={key}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Avatar alt="Remy Sharp" src={image} sx={{ width: 150, height: 150 }} />
        <Typography align="center" variant="h5" component="h2">
          {name}
        </Typography>
      </Stack>
    </Box>
  );
}
