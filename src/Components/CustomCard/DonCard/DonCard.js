import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";
import TagIcon from "@mui/icons-material/Tag";
export default function DonCard({ data, handleCardClick }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const truncate = (input) =>
    input.length > 450 ? `${input.substring(0, 450)}...Read More` : input;
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Card sx={{ maxWidth: 400, maxHeight: 645 }}>
        <CardActionArea onClick={handleCardClick}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="postCard"
                alt="posted Org"
                sx={{ width: 50, height: 50 }}
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
                ? "posted " + moment(data.createdAt.toDate()).fromNow()
                : "posted " + "September 14, 2016"
            }
          />
          <CardMedia
            component="img"
            height="194"
            width="400px"
            onLoad={() => setLoading((prev) => !prev)}
            image={
              data
                ? data.ThumbnailUrl
                : "https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/ExampleImages%2FEduShareThumbnail.jpg?alt=media&token=53f60981-928a-40e4-9389-1e47df3191c5"
            }
            alt="Paella dish"
            sx={{ display: loading ? "none" : "block" }}
          />
          {loading && (
            <Skeleton
              variant="rectangular"
              width={400}
              height={194}
              animation="wave"
            />
          )}
          <CardContent sx={{ height: 200 }}>
            <Typography gutterBottom variant="button" component="div">
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="justify"
              gutterBottom
            >
              {data && truncate(data.details)}
            </Typography>
          </CardContent>
          <CardContent>
            {data &&
              data.intrest.map((intrest) => {
                return (
                  <Chip
                    color="info"
                    label={intrest}
                    key={intrest}
                    size="small"
                    sx={{ p: 1, m: 0.5 }}
                    icon={<TagIcon />}
                  />
                );
              })}
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
