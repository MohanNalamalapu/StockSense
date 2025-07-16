import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function Predictions() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f8fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 4, minWidth: 400, maxWidth: 600 }} elevation={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <ShowChartIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" color="primary">AI Predictions</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Here you'll see your latest stock forecasts, charts, and model explanations.
        </Typography>
        {/* Example output */}
        <Box sx={{ bgcolor: "#eaf6fb", p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" color="primary">AAPL: $195.23 (↑ 2.1%)</Typography>
          <Typography variant="body2" color="text.secondary">Prediction: Uptrend expected next week based on AI model analysis.</Typography>
        </Box>
      </Paper>
    </Box>
  );
}
