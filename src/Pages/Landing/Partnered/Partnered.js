import { Container, Grid, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";

import React from "react";
import CustomAvatar from "../../../Components/CustomeAvatar/CustomAvatar";

export default function Partnered() {
  const theme = useTheme();

  return (
    <Container
      id="partnered"
      maxWidth="none"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        p: 4,
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography
          variant="h3"
          color={theme.palette.primary.main}
          align="center"
          sx={{
            marginBottom: "5rem",
          }}
        >
          Partnered Organizations
        </Typography>
        <Grid container spacing={10}>
          {[1, 2, 3, 4, 5, 6].map((vision, index) => {
            return (
              <Grid item sm={12} md={2}>
                <CustomAvatar />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  );
}
