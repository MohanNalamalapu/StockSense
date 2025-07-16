import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function Profile() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f8fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 4, minWidth: 320 }} elevation={3}>
        <Typography variant="h5" color="primary" gutterBottom>User Profile</Typography>
        {/* Add user info, settings, etc. here */}
      </Paper>
    </Box>
  );
}
