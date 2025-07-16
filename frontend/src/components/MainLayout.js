import React from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Outlet } from "react-router-dom";

const drawerWidth = 220;

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon color="primary" />, path: "/dashboard" },
  { text: "Predictions", icon: <ShowChartIcon color="primary" />, path: "/predictions" },
  { text: "Watchlist", icon: <ListAltIcon color="primary" />, path: "/watchlist" },
  { text: "Chatbot", icon: <ChatBubbleOutlineIcon color="primary" />, path: "/chatbot" },
  { text: "Profile", icon: <AccountCircleIcon color="primary" />, path: "/profile" },
];

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f8fa" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#182848', color: '#fff' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: '#fff' }}>StockSense</Typography>
        </Toolbar>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)} sx={{ my: 1, borderRadius: 2 }}>
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button sx={{ mt: 4, borderRadius: 2 }} onClick={() => navigate("/login")}> {/* Logout */}
            <ListItemIcon sx={{ color: '#fff' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', color: '#182848', boxShadow: 'none', borderBottom: '1px solid #eaf6fb' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ fontWeight: 600, flexGrow: 1 }}>AI-Powered Stock Forecasting</Typography>
            <IconButton color="primary" onClick={() => navigate("/profile")}> <AccountCircleIcon /> </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
