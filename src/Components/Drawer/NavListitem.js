import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function NavListitem({ label, icon, activeIcon, path, onClick }) {
  const [active, setActive] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const ActiveMenuIteStyle = {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
    width: "80%",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  };
  const NormalMenuItemStyle = {
    width: "80%",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  };
  const ActiveIconStyle = {
    color: theme.palette.secondary.dark,
  };

  useEffect(() => {
    setActive(location.pathname === path);
  }, [location, path]);
  return (
    /* menuitem class deafult if active is true menuitemative class will be set */
    <Tooltip title={label} placement="right" arrow>
      <ListItem
        button
        key={label}
        sx={active ? ActiveMenuIteStyle : NormalMenuItemStyle}
        onClick={() => {
          if (path === "logout") {
            navigate("/login");
          } else {
            onClick();
            navigate(path);
          }
        }}
      >
        <ListItemIcon sx={active && ActiveIconStyle}>
          {active ? activeIcon : icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ varient: "body2" }}
        />
      </ListItem>
    </Tooltip>
  );
}

export default NavListitem;
