import { Container, Grid, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import CustomCard from "../../../Components/CustomCard/CustomCard";

export default function NewOpportunities() {
  const theme = useTheme();
  return (
    <Container id="opportunities" maxWidth="lg" sx={{ pt: 2 }}>
      <Typography
        variant="h3"
        color={theme.palette.primary.main}
        align="center"
        sx={{
          marginTop: "1rem",
        }}
      >
        Our Newest Opprtunities
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {[1, 2, 3, 4].map((vision, index) => {
          return (
            <Grid item sm={12} md={6} key={index} sx={{ mt: { xs: 5, sm: 5 } }}>
              <Stack justifyContent="center" alignItems="center">
                <CustomCard />
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
