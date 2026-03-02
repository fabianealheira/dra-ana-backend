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
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const response = await openai.responses.create({
      model: "gpt-5.2",
      input: [
        {
          role: "system",
          content: [
            { type: "input_text", text: systemPrompt }
          ]
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: message }
          ]
        }
      ],
      temperature: 0.2
    });

    const answer = response.output_text;

    return res.status(200).json({
      answer
    });

  } catch (error) {
    console.error("Erro backend:", error);

    return res.status(500).json({
      error: "Erro ao processar requisição",
      details: error.message,
    });
  }
}
