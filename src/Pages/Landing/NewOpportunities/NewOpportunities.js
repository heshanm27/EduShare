import { Container, Grid, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../../Components/CustomCard/CustomCard";
import CustomSkeletonCard from "../../../Components/CustomSkeletonCard/CustomSkeletonCard";
import { db } from "../../../FireBase/Config";
import { motion } from "framer-motion";
import {
  container,
  item,
  itemBtn,
  itemOpp,
} from "../../../Components/Animations/Animations";
export default function NewOpportunities() {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/edufeed");
  };
  useEffect(() => {
    const querry = query(
      collection(db, "EduationalPost"),
      orderBy("createdAt", "desc"),
      limit(6)
    );

    const getData = async () => {
      const querySnapshot = await getDocs(querry);
      querySnapshot.docs.forEach((doc) =>
        setData((prev) => {
          return [...prev, doc.data()];
        })
      );

      setLoading(false);
    };
    getData();
  }, []);
  return (
    <Container id="opportunities" maxWidth="xl" sx={{ pt: 5, mt: 10 }}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.5 }}
        exit="exit"
      >
        <Typography
          variant="h3"
          color={theme.palette.primary.main}
          align="center"
          sx={{
            marginTop: "1rem",
          }}
        >
          Our Newest Opprtunities
        </Typography>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {data &&
            data.map((item, index) => (
              <Grid
                item
                sm={12}
                md={4}
                key={index}
                sx={{ mt: { xs: 5, sm: 5 } }}
              >
                <Stack justifyContent="center" alignItems="center">
                  <CustomCard
                    data={item}
                    handleCardClick={() => handleCardClick(item)}
                  />
                </Stack>
              </Grid>
            ))}
          {loading && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 5 }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <Grid
                  item
                  sm={12}
                  md={4}
                  key={index}
                  sx={{ mt: { xs: 5, sm: 5 } }}
                >
                  <Stack justifyContent="center" alignItems="center">
                    <CustomSkeletonCard />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </motion.div>
    </Container>
  );
}
