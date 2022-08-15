import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import BgImg from "../../../Assets/images/10088.jpg";
export default function Home() {
  const theme = useTheme();
  const ScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div id="home">
      <Container maxWidth="lg" sx={{ display: "flex" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ mt: { sm: 8, md: 0 } }}
        >
          <Grid
            direction={ScreenSize ? "column-reverse" : "row"}
            container
            justifyContent="center"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                color={theme.palette.primary.main}
                align={ScreenSize ? "center" : "left"}
              >
                Let's explore!
              </Typography>
              <Typography
                color={theme.palette.primary.main}
                variant="h3"
                align={ScreenSize ? "center" : "left"}
              >
                Your future
              </Typography>
              <Typography
                color={theme.palette.secondary.main}
                variant="h3"
                align={ScreenSize ? "center" : "left"}
              >
                EduShare
              </Typography>
              <Typography
                variant="body2"
                align="justify"
                paragraph
                sx={{ mt: 3 }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </Typography>
              <Button sx={{ mt: 5 }} variant="contained" href="#about">
                Read More
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                justifyContent=""
                alignItems="end"
                sx={{ mt: { sm: 8, md: 0 } }}
              >
                <img
                  src={BgImg}
                  alt="background"
                  style={{ width: "120%", height: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
          <div className="LandingHome"></div>
        </Box>
      </Container>
    </div>
  );
}
