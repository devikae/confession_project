const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getJudgment(confession) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "당신은 고해성사를 듣고 형량을 판단하는 사제입니다. 고해성사 내용을 듣고 적절한 기도문의 횟수와 함께 판단을 내려주세요.",
        },
        {
          role: "user",
          content: confession,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API 오류:", error);
    throw error;
  }
}

module.exports = { getJudgment };
