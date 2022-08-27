import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

export default function CustomCard({ data }) {
  const theme = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => alert("licked")}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="postCard"
                alt="posted Org"
                sx={{ width: 80, height: 80 }}
                src="https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/ExampleImages%2FLogo.png?alt=media&token=f7914701-962d-4f22-a07c-8bc4eb3f3017"
              />
            }
            title="Sri Lanka Institute of Information Technology"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image="https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/ExampleImages%2FEduShareThumbnail.jpg?alt=media&token=53f60981-928a-40e4-9389-1e47df3191c5"
            alt="Paella dish"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {data.title}
              {data.courseFee}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="justify"
              gutterBottom
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
