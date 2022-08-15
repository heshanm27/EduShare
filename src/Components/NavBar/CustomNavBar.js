import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLinks } from "../../Constants/Constants";

export default function CustomNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigateUsingMenu = (link) => {
    console.log(window.scrolly);
    setOpen(false);
    const violation = document.getElementById(link.substring(1));

    window.scrollTo({
      top: violation?.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          display: { xs: "none", sm: "none", md: "block" },
        }}
        position="sticky"
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
              >
                EduShare
              </Typography>
            </Toolbar>
            <Stack alignItems="center" direction="row" spacing={1}>
              {NavLinks.map((link, index) => {
                if (link.path === "signin") {
                  return (
                    <Button
                      key={index}
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
                    <Button key={index} variant="text" href={link.path}>
                      {link.title}
                    </Button>
                  );
                }
              })}
            </Stack>
          </Stack>
        </Container>
      </AppBar>

      <AppBar
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          display: { sm: "block", md: "none" },
        }}
        position="sticky"
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
              >
                EduShare
              </Typography>
            </Toolbar>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              direction="column"
            >
              <IconButton
                aria-label="openDrawer"
                size="large"
                onClick={() => setOpen(true)}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Stack
                  alignItems="center"
                  justifyContent="space-evenly"
                  direction="column"
                  spacing={2}
                  mt={5}
                >
                  {NavLinks.map((link, index) => {
                    if (link.path === "signin") {
                      return (
                        <Button
                          key={index}
                          color="secondary"
                          variant="contained"
                          startIcon={link?.icon}
                          onClick={() => navigateUsingMenu(link.path)}
                        >
                          Sign In
                        </Button>
                      );
                    } else {
                      return (
                        <Button
                          key={index}
                          variant="text"
                          onClick={() => navigateUsingMenu(link.path)}
                        >
                          {link.title}
                        </Button>
                      );
                    }
                  })}
                </Stack>
              </Drawer>
            </Stack>
          </Stack>
        </Container>
      </AppBar>
    </>
  );
}
