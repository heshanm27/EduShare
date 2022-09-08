import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import UserLogo from "../../../Assets/UserRoleImges/Asset 2.png";
import OrgLogo from "../../../Assets/UserRoleImges/Asset 1.png";
import CustomNavBar from "../../../Components/NavBar/CustomNavBar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function SignUpRole() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRole = (role) => {
    switch (role) {
      case "user":
        navigate("/signup");
        break;
      case "org":
        navigate("/orgsignup");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -100,
          transition: { duration: 0.8 },
        }}
      >
        <CustomNavBar />
        <Container maxWidth="md" sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            sx={{ mb: 2 }}
            align="center"
            color={theme.palette.secondary.main}
          >
            Choose Your Role
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <Grid
                item
                xs={12}
                sx={{ m: 2, cursor: "pointer" }}
                onClick={() => handleRole("user")}
              >
                <Paper sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                  <img src={UserLogo} width="200px" alt="UserRole" />
                  <Button>User</Button>
                </Paper>
              </Grid>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Grid
                item
                xs={12}
                sx={{ m: 1, cursor: "pointer" }}
                onClick={() => handleRole("org")}
              >
                <Paper sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                  <img src={OrgLogo} width="200px" alt="OrgRole" />
                  <Button>Organization</Button>
                </Paper>
              </Grid>
            </motion.div>
          </Grid>
        </Container>
      </motion.div>
    </>
  );
}
