import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
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
        "http://localhost:5001/api/analyze",
        { confession },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("서버 응답:", response.data); // 디버깅용 로그
      setJudgment(response.data.judgment);
    } catch (error) {
      console.error("에러 발생:", error);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={confession}
            onChange={(e) => setConfession(e.target.value)}
            placeholder="당신의 죄를 상세히 설명해주세요..."
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mt: 2, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "분석하기"
            )}
          </Button>
        </form>

        {judgment && (
          <Box mt={3} p={2} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="h6" gutterBottom>
              판결 결과:
            </Typography>
            <Typography
              component="pre"
              sx={{
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
              }}
            >
              {judgment}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ConfessionForm;
