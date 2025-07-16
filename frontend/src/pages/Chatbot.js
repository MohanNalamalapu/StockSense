import React, { useState } from "react";
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me anything about StockSense predictions." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    // Mock bot reply
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: "bot", text: "I'm here to help! (AI reply placeholder)" }]);
    }, 600);
    setInput("");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eaf6fb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 3, minWidth: 350, maxWidth: 500 }} elevation={4}>
        <Box display="flex" alignItems="center" mb={2}>
          <ChatBubbleOutlineIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" color="primary">StockSense Chatbot</Typography>
        </Box>
        <List sx={{ minHeight: 200, maxHeight: 300, overflowY: "auto", bgcolor: "#f5f8fa", mb: 2 }}>
          {messages.map((msg, i) => (
            <ListItem key={i} sx={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              <ListItemText primary={msg.text} sx={{ textAlign: msg.sender === "user" ? "right" : "left" }} />
            </ListItem>
          ))}
        </List>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>Send</Button>
        </Box>
      </Paper>
    </Box>
  );
}
