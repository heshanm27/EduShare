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
import moment from "moment";
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
                src={
                  data.createdBy
                    ? data.createdBy.image
                    : "https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/ExampleImages%2FLogo.png?alt=media&token=f7914701-962d-4f22-a07c-8bc4eb3f3017"
                }
              />
            }
            title={data.createdBy ? data.createdBy.name : "example"}
            subheader={
              data
                ? "Posted " + moment(data.createdAt.toDate()).fromNow()
                : "Posted " + "September 14, 2016"
            }
          />
          <CardMedia
            component="img"
            height="194"
            image={
              data
                ? data.ThumbnailUrl
                : "https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/ExampleImages%2FEduShareThumbnail.jpg?alt=media&token=53f60981-928a-40e4-9389-1e47df3191c5"
            }
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
              {data && data.details}
              Lorem Ipsum.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
