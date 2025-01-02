import React, { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import axios from "axios";

const ConfessionForm = () => {
  const [confession, setConfession] = useState("");
  const [judgment, setJudgment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/confessions",
        {
          content: confession,
        }
      );
      setJudgment(response.data.judgment);
    } catch (error) {
      console.error("오류:", error);
      alert("죄송합니다. 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          고해성사
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={confession}
            onChange={(e) => setConfession(e.target.value)}
            placeholder="당신의 죄를 고백하세요..."
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "판단중..." : "고해하기"}
          </Button>
        </form>
        {judgment && (
          <Box mt={3}>
            <Typography variant="h6">판결:</Typography>
            <Typography>{judgment}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ConfessionForm;
