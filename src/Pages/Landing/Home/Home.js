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
import BgImg from "../../../Assets/images/bg.jpg";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { motion } from "framer-motion";
import {
  container,
  item,
  itemBtn,
} from "../../../Components/Animations/Animations";
export default function Home() {
  const theme = useTheme();
  const ScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div id="home">
      <Container maxWidth="lg" sx={{ display: "flex" }}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.5 }}
          exit="exit"
        >
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
                <motion.div variants={item}>
                  <Typography
                    variant="h2"
                    color={theme.palette.primary.main}
                    align={ScreenSize ? "center" : "left"}
                  >
                    Let's explore!
                  </Typography>
                </motion.div>
                <motion.div variants={item}>
                  <Typography
                    color={theme.palette.primary.dark}
                    variant="h3"
                    align={ScreenSize ? "center" : "left"}
                  >
                    Your future with,
                  </Typography>
                </motion.div>
                <motion.div variants={item}>
                  <Typography
                    color={theme.palette.secondary.main}
                    variant="h3"
                    align={ScreenSize ? "center" : "left"}
                  >
                    EduShare
                  </Typography>
                </motion.div>
                <motion.div variants={item}>
                  <Typography
                    variant="body2"
                    align="justify"
                    paragraph
                    sx={{ mt: 3 }}
                    color="#5f6c7b"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum
                  </Typography>
                </motion.div>
                <motion.div variants={item}>
                  <Button
                    sx={{ mt: 5 }}
                    variant="contained"
                    href="#about"
                    endIcon={<ArrowDownwardIcon />}
                  >
                    Read More
                  </Button>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={item}>
                  <Box
                    display="flex"
                    justifyContent=""
                    alignItems="end"
                    sx={{ mt: { sm: 8, md: 0 } }}
                  >
                    <img
                      src={BgImg}
                      alt="background"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
}
