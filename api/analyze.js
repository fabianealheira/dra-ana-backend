import OpenAI from "openai";

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
      model: "gpt-4.1",
      messages: messages,
    });

    return res.status(200).json({
      result: response.choices[0].message,
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao processar requisição",
      details: error.message,
    });
  }
}
