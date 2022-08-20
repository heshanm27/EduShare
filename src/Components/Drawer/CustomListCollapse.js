import React, { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Inboxicon from "@mui/icons-material/MoveToInbox";
import NavListitem from "./NavListitem";
import { ListSubheader, Tooltip, useMediaQuery, useTheme } from "@mui/material";

export default function CustomListCollapse(props) {
  const { TitleIcon, TitleText, ListItems, onclicks, Subheader, DrawerStatus } =
    props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const resalution = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      }}
      subheader={DrawerStatus && <ListSubheader>{Subheader}</ListSubheader>}
    >
      <Tooltip title={TitleText} placement="right" arrow>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>{TitleIcon}</ListItemIcon>
          <ListItemText primary={TitleText} />

          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {ListItems.map((route, index) => {
            return (
              <NavListitem
                label={route.label}
                activeIcon={route.activeIcon}
                icon={route.icon}
                path={route.path}
                key={index}
                onClick={onclicks}
              />
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
