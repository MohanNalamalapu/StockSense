import React from "react";
import Auth from "../components/Auth";
import { Box } from "@mui/material";

export default function Login() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f8fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Auth />
    </Box>
  );
}
