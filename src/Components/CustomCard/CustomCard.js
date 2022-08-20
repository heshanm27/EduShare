import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
// import { motion } from "framer-motion";
import React from "react";

export default function CustomCard({ props }) {
  const theme = useTheme();
  return (
    // <motion.div whileHover={{ scale: 1.2 }}>
    <Card
      sx={{ maxWidth: 345, backgroundColor: theme.palette.primary.main }}
      onClick={() => {
        alert("Clikced");
      }}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe">R</Avatar>}
        action={<IconButton aria-label="settings"></IconButton>}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"></IconButton>
        <IconButton aria-label="share"></IconButton>
      </CardActions>
    </Card>
    // </motion.div>
  );
}
