import React from "react";
import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f8fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h3" color="error">404 - Page Not Found</Typography>
    </Box>
  );
}
