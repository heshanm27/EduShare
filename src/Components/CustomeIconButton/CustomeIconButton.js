import { IconButton, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

export default function CustomeIconButton({ Icon, url, label, isScoial }) {
  const style = [
    {
      "&.MuiIconButton-root": {
        "&:hover": {
          color: "white",
          backgroundColor: "#40C4FF",
          opacity: 0.8,
        },
      },
    },
  ];

  const style2 = [
    {
      "&.MuiIconButton-root": {
        "&:hover": {
          color: "black",
          backgroundColor: "white",
          borderColor: "black",
          opacity: 0.8,
        },
        color: "white",
        backgroundColor: "black",
      },
    },
  ];
  return (
    <Tooltip title={label} placement="right">
      <IconButton
        aria-label="delete"
        onClick={() => {
          window.open(url, "_blank");
        }}
        color={isScoial === true ? "default" : "primary"}
        size="large"
        sx={isScoial === true ? style2 : style}
      >
        {Icon}
      </IconButton>
    </Tooltip>
  );
}
