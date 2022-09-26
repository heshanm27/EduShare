import { Box } from "@material-ui/core";
import { Container, Grid, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomAvatar from "../../../Components/CustomeAvatar/CustomAvatar";
import { partneredDetails } from "../../../Constants/Constants";

export default function Partnered() {
  const theme = useTheme();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Container
        id="partnered"
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          p: 4,
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography
            variant="h3"
            color={theme.palette.primary.main}
            align="center"
            sx={{
              marginBottom: "5rem",
            }}
          >
            Partnered Organizations
          </Typography>
        </Stack>
      </Container>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: { sm: "50px" },
        }}
      >
        <Slider {...settings}>
          {partneredDetails.map((partner, index) => {
            return (
              <CustomAvatar
                key={index}
                name={partner.name}
                image={partner.image}
              />
            );
          })}
        </Slider>
      </Box>
    </>
  );
}
