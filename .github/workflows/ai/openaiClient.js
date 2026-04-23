import OpenAI from "openai";
import promptTemplate from "./promptTemplate.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generatePlaywrightCode(task) {
  const prompt = promptTemplate(task);

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
}

export default generatePlaywrightCode;