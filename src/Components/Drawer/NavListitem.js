import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function NavListitem({ label, icon, activeIcon, path, onClick }) {
  const [active, setActive] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(location.pathname === path);
  }, [location]);
  return (
    /* menuitem class deafult if active is true menuitemative class will be set */
    <Tooltip title={label} placement="right" arrow>
      <ListItem
        button
        key={label}
        onClick={() => {
          if (path === "logout") {
            navigate("/login");
          } else {
            onClick();
            navigate(path);
          }
        }}
      >
        <ListItemIcon>{active ? activeIcon : icon}</ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ varient: "body2" }}
        />
      </ListItem>
    </Tooltip>
  );
}

export default NavListitem;
