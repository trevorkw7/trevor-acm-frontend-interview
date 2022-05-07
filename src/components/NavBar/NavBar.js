import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const NavBar = () => {
  return (
    <>
      <AppBar color="primary" position="static">
        <Typography
          sx={{ padding: 0, marginTop: 0.5 }}
          align="center"
          variant="h4"
        >
          <IconButton sx={{ marginBottom: 0.5 }}>
            <img alt="logo512" src="/acm-logo.png" width="48" height="48" />
          </IconButton>
          Events
        </Typography>
      </AppBar>
    </>
  );
};

export default NavBar;
