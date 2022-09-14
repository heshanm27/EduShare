import {
  AppBar,
  Avatar,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLinks } from "../../Constants/Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../FireBase/Config";

export default function CustomNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [hide, setHide] = useState(false);
  const location = useLocation();
  const [anchor, setAnchor] = useState(false);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (path) => {
    if (path === "logout") {
      signOut(auth);
      setAnchor(false);
    } else {
      navigate(path);
      setAnchor(false);
    }
  };
  const { curruntUser, isLoggedIn } = useSelector((state) => state.user);
  const navigateUsingMenu = (link) => {
    setOpen(false);
    const violation = document.getElementById(link.substring(1));

    window.scrollTo({
      top: violation?.offsetTop,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", () => {
    setHash(window.location.hash);
  });

  useEffect(() => {
    console.log(location.pathname.toLowerCase());
    switch (location.pathname.toLowerCase()) {
      case "/signin":
        setHide(true);
        break;
      case "/signup":
        setHide(true);
        break;
      case "/roles":
        setHide(true);
        break;
      default:
        setHide(false);
    }
  }, [location.pathname, hide]);
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
              <Link href="/" underline="none">
                <Typography
                  variant="h4"
                  color={theme.palette.primary.main}
                  component="div"
                >
                  EduShare
                </Typography>
              </Link>
            </Toolbar>

            <Stack alignItems="center" direction="row" spacing={1}>
              {!hide &&
                NavLinks.map((link, index) => {
                  if (link.path === "signin") {
                    switch (isLoggedIn) {
                      case false:
                        return (
                          <Button
                            key={index}
                            color="secondary"
                            variant="contained"
                            startIcon={link?.icon}
                            href="/signin"
                          >
                            Sign In
                          </Button>
                        );

                      case true:
                        return (
                          <>
                            <Button
                              variant="text"
                              color="primary"
                              component="a"
                              href="/edufeed"
                            >
                              User Feed
                            </Button>

                            <IconButton
                              aria-label="delete"
                              onClick={handleClick}
                              size="large"
                              key={index}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src={curruntUser.image ? curruntUser.image : ""}
                              />
                            </IconButton>
                          </>
                        );

                      default:
                        return null;
                    }
                  } else {
                    return (
                      <Button
                        key={index}
                        variant={hash === link.path ? "outlined" : "text"}
                        color={hash === link.path ? "secondary" : "primary"}
                        href={link.path}
                      >
                        {link.title}
                      </Button>
                    );
                  }
                })}
              {hide && (
                <Button variant="contained" href="/">
                  Home
                </Button>
              )}

              <IconButton aria-label="delete" size="large"></IconButton>
            </Stack>
          </Stack>
        </Container>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={anchor}
        onClose={handleClose}
      >
        {curruntUser?.role != "admin" && (
          <MenuItem onClick={() => handleClose("/profile")}>
            My account
          </MenuItem>
        )}
        {curruntUser?.role == "admin" && (
          <MenuItem onClick={() => handleClose("/interested")}>
            DashBord
          </MenuItem>
        )}
        {curruntUser?.role == "org" && (
          <MenuItem onClick={() => handleClose("/edu")}>DashBord</MenuItem>
        )}
        <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
      </Menu>
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
                <MenuList>
                  {NavLinks.map((link, index) => {
                    if (link.path === "signin") {
                      return (
                        <MenuItem
                          onClick={() => navigateUsingMenu(link.path)}
                          key={index}
                        >
                          Sign In
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem
                          onClick={() => navigateUsingMenu(link.path)}
                          key={index}
                        >
                          <ListItemText>{link.title} </ListItemText>
                        </MenuItem>
                      );
                    }
                  })}
                </MenuList>
              </Drawer>
            </Stack>
          </Stack>
        </Container>
      </AppBar>
    </>
  );
}
