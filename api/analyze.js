import OpenAI from "openai";

import { systemPrompt } from "../lib/systemPrompt.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      messages: [
  { role: "system", content: systemPrompt },
  ...messages
],

  return res.status(200).json({
  answer: response.choices[0].message.content,
});

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao processar requisição",
      details: error.message,
    });
  }
}
