import { Container, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
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
          This page could not be found.
        </Typography>

        <Typography
          align="center"
          display="inline"
          color="secondary"
          sx={{
            fontSize: "3rem",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => navigate(-1)}
        >
          Go back
        </Typography>
      </Stack>
    </Container>
  );
}
