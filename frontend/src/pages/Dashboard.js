import React from "react";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaf6fb", p: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>Dashboard</Typography>
      <Typography color="text.secondary">Welcome to your StockSense dashboard.</Typography>
      {/* Add dashboard widgets and navigation here */}
    </Box>
  );
}
