import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ConfessionForm from "./components/ConfessionForm";

function App() {
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          디지털 고해성사
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          당신의 죄를 고백하세요, AI가 형량을 알려드립니다
        </Typography>
        <ConfessionForm />
      </Box>
    </Container>
  );
}

export default App;
