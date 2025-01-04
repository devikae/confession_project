const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config({ path: "./config/config.env" });

const app = express();

// CORS 설정을 더 상세하게 구성
const corsOptions = {
  origin: "http://localhost:3000", // React 앱의 주소
  methods: ["POST", "GET", "OPTIONS"], // 허용할 HTTP 메서드
  allowedHeaders: ["Content-Type", "Authorization"], // 허용할 헤더
  credentials: true, // 쿠키 허용
};

app.use(cors(corsOptions));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 테스트용 라우트 추가
app.get("/test", (req, res) => {
  res.json({ message: "서버가 정상적으로 작동중입니다." });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { confession } = req.body;
    console.log("받은 고해성사 내용:", confession); // 디버깅용 로그

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "당신은 한국의 법률 전문가입니다. 사용자의 고백 내용을 바탕으로 한국 법률에 따른 예상 형량을 알려주세요. 답변은 다음 형식으로 해주세요: 1. 해당되는 법률 2. 예상 형량 3. 간단한 설명",
        },
        {
          role: "user",
          content: confession,
        },
      ],
    });

    console.log("GPT 응답:", completion.choices[0].message.content); // 디버깅용 로그
    res.json({ judgment: completion.choices[0].message.content });
  } catch (error) {
    console.error("서버 에러:", error);
    res.status(500).json({
      error: "서버 오류가 발생했습니다.",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다`);
  console.log("CORS 설정:", corsOptions.origin);
});
