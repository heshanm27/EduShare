import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { AboutVision } from "../../../Constants/Constants";
export default function AboutUs() {
  const theme = useTheme();
  return (
    <Container id="about" maxWidth="xl" sx={{}}>
      <Typography
        variant="h3"
        color={theme.palette.primary.main}
        align="center"
        sx={{ marginTop: "1rem" }}
      >
        About Our Vision
      </Typography>
      <Grid
        container
        spacing={5}
        sx={{ p: 5, mt: -12 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {AboutVision.map((vision, index) => {
          return (
            <Grid item sm={12} md={6} key={index} sx={{ mt: { xs: 5, sm: 5 } }}>
              <Stack justifyContent="center" alignItems="center">
                <Typography
                  variant="h4"
                  align="center"
                  paragraph
                  color={theme.palette.secondary.main}
                >
                  {vision.title}
                </Typography>
                <Typography variant="body2" align="justify" paragraph>
                  {vision.body}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{ mt: 5 }}
                >
                  {vision.btntext}
                </Button>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
