import { Container, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function NotFound() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography sx={{ fontSize: "3rem" }} align="center" display="inline">
          404
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography align="center" display="inline" sx={{ fontSize: "3rem" }}>
          This page could not be found. Go back
        </Typography>
      </Stack>
    </Container>
  );
}
