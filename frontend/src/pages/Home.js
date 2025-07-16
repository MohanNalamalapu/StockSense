import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f8fa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h2" color="primary" gutterBottom>StockSense</Typography>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>AI-powered stock forecasting made simple.</Typography>
      <Button variant="contained" color="primary" size="large" href="/login">Get Started</Button>
    </Box>
  );
}
