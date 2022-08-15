import {
  AppBar,
  Box,
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
      <AppBar elevation={0} sx={{ backgroundColor: "#fff" }} position="static">
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Toolbar>
              <Typography
                variant="h6"
                color={theme.palette.primary.main}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                News
              </Typography>
            </Toolbar>
            <Stack direction="row" spacing={5}>
              {NavLinks.map((link, index) => (
                <Link underline="none" href={link.path}>
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </AppBar>

      <Box sx={{ mt: 2 }}>{children}</Box>
    </>
  );
}
