import React, { useState } from "react";
import { Box, Paper, Grid, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const STOCK_OPTIONS = ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN"];
const MODEL_OPTIONS = ["CNN+LSTM", "GRU", "Prophet"];
const FORECAST_OPTIONS = [7, 14, 30];

function StockDashboard() {
  const [ticker, setTicker] = useState("TSLA");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forecastHorizon, setForecastHorizon] = useState(7);
  const [model, setModel] = useState("CNN+LSTM");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call backend API to fetch prediction
    alert(`Predicting for ${ticker} from ${startDate} to ${endDate} for ${forecastHorizon} days using ${model}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Stock Ticker</InputLabel>
              <Select
                value={ticker}
                label="Stock Ticker"
                onChange={(e) => setTicker(e.target.value)}
              >
                {STOCK_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Forecast Horizon</InputLabel>
              <Select
                value={forecastHorizon}
                label="Forecast Horizon"
                onChange={(e) => setForecastHorizon(Number(e.target.value))}
              >
                {FORECAST_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option} days</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Model</InputLabel>
              <Select
                value={model}
                label="Model"
                onChange={(e) => setModel(e.target.value)}
              >
                {MODEL_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ height: "100%" }}>
              Predict
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={4}>
        <Typography variant="h6" align="center" color="text.secondary">
          {/* Prediction results and charts will appear here */}
          Coming soon: Interactive charts and AI insights!
        </Typography>
      </Box>
    </Paper>
  );
}

export default StockDashboard;
