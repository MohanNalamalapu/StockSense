import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ bgcolor: '#182848', color: '#fff', boxShadow: 0 }}>
      <Toolbar>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1, letterSpacing: 1 }}>
          StockSense
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate("/predictions")}>Predictions</Button>
          <Button color="inherit" onClick={() => navigate("/watchlist")}>Watchlist</Button>
          <Button color="inherit" onClick={() => navigate("/chatbot")}>Chatbot</Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
