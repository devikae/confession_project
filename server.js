const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/config.env" });

const app = express();

app.use(cors());
app.use(express.json());

// 라우트 설정
app.use("/api/confessions", require("./routes/confessionRoutes"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB 연결 성공");
    app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행중입니다`));
  })
  .catch((err) => console.error("MongoDB 연결 실패:", err));
