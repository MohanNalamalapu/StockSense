import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function Watchlist() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaf6fb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 4, minWidth: 320 }} elevation={3}>
        <Typography variant="h5" color="primary" gutterBottom>Watchlist</Typography>
        {/* Add user's favorite stocks here */}
      </Paper>
    </Box>
  );
}
