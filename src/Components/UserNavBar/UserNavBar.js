import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  Button,
  Avatar,
  ListItemText,
  Drawer,
  Box,
  ListItem,
  ListItemButton,
  List,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../FireBase/Config";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { UserNavLinks } from "../../Constants/Constants";
import { motion } from "framer-motion";
import { ControlCameraSharp } from "@material-ui/icons";
export default function UserNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(false);
  const { curruntUser, isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();
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
  const navigateUsingMenu = (link) => {
    setOpen(false);
    navigate(link);
  };
  console.log(location.pathname);
  return (
    <>
      <AppBar
        elevation={1}
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
                UserNavLinks.map((link, index) => {
                  console.log(link.path);
                  return (
                    <Button
                      key={index}
                      variant={
                        location?.pathname === link.path ? "outlined" : "text"
                      }
                      color={
                        location?.pathname === link.path
                          ? "secondary"
                          : "primary"
                      }
                      href={link.path}
                    >
                      {link.title}
                    </Button>
                  );
                })}
              <IconButton
                aria-label="delete"
                onClick={handleClick}
                size="large"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={curruntUser.image ? curruntUser.image : ""}
                />
              </IconButton>
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
          <MenuItem onClick={() => handleClose("/qualifications")}>
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
                <Box sx={{ width: "200px" }}>
                  <List>
                    {UserNavLinks.map((link, index) => {
                      return (
                        <ListItem
                          onClick={() => navigateUsingMenu(link.path)}
                          key={index}
                          disablePadding
                        >
                          <ListItemButton>
                            <ListItemText>{link.title} </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Drawer>
            </Stack>
          </Stack>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{
            opacity: 0,
            x: -100,
            transition: { duration: 0.1, ease: "easeIn", bounce: 0.5 },
          }}
        >
          <Outlet />
        </motion.div>
      </Box>
    </>
  );
}
