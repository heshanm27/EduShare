import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

import { NavLinks } from "../../Constants/Constants";

export default function CustomNavBar({ children }) {
  const theme = useTheme();
  return (
    <>
      <AppBar
        elevation={0}
        sx={{ backgroundColor: "#fff", display: { sm: "none", md: "block" } }}
        position="static"
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Toolbar>
              <Typography
                variant="h4"
                color={theme.palette.primary.main}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                EduShare
              </Typography>
            </Toolbar>
            <Stack alignItems="center" direction="row" spacing={5}>
              {NavLinks.map((link, index) => {
                if (link.path === "signin") {
                  return (
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={link?.icon}
                      href="#about"
                    >
                      Sign In
                    </Button>
                  );
                } else {
                  return (
                    <Button variant="text" href={link.path}>
                      {link.title}
                    </Button>
                  );
                }
              })}
            </Stack>
          </Stack>
        </Container>
      </AppBar>
    </>
  );
}
