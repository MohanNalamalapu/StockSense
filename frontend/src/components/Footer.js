import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#182848', color: '#fff', py: 2, mt: 6, textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} StockSense. All rights reserved. | <Link href="/" color="inherit" underline="hover">Home</Link> | <Link href="/about" color="inherit" underline="hover">About</Link>
      </Typography>
    </Box>
  );
}
