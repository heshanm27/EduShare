import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { AboutVision } from "../../../Constants/Constants";
import { motion } from "framer-motion";
import {
  container,
  item,
  itemBtn,
} from "../../../Components/Animations/Animations";
export default function AboutUs() {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", backgroundColor: theme.palette.primary.main }}>
      <Container
        id="about"
        maxWidth="xl"
        sx={{
          pt: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.5 }}
          exit="exit"
        >
          <motion.div variants={item}>
            <Typography
              variant="h3"
              color="white"
              align="center"
              sx={{
                marginBottom: "5rem",
              }}
            >
              About Our Vision
            </Typography>
          </motion.div>
          <motion.div variants={item}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {AboutVision.map((vision, index) => {
                return (
                  <Grid
                    item
                    sm={12}
                    md={6}
                    key={index}
                    sx={{ mt: { xs: 5, sm: 2 }, p: 2 }}
                  >
                    <Stack justifyContent="center" alignItems="center">
                      <Paper
                        sx={{
                          p: 5,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h4"
                          align="center"
                          paragraph
                          color={theme.palette.secondary.main}
                        >
                          {vision.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          align="justify"
                          color="#5f6c7b"
                          paragraph
                        >
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
                      </Paper>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
