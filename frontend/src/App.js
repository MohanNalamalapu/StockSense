import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import Predictions from "./pages/Predictions";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import { CssBaseline, Container, Typography, Box } from "@mui/material";
import StockDashboard from "./components/StockDashboard";
import Auth from "./components/Auth";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 64px - 48px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
