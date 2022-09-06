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
  MenuList,
  Drawer,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../FireBase/Config";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { UserNavLinks } from "../../Constants/Constants";
import { motion } from "framer-motion";
export default function UserNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(false);
  const { curruntUser, isLoggedIn } = useSelector((state) => state.user);

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
                  return (
                    <Button
                      key={index}
                      variant={hash === link.path ? "outlined" : "text"}
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

              <Drawer
                sx={{ width: "240px" }}
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
              >
                <MenuList>
                  {UserNavLinks.map((link, index) => {
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
