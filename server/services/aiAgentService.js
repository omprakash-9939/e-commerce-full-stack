
import axios from "axios";

const AI_AGENT_URL = process.env.AI_AGENT_URL;
const AI_AGENT_KEY = process.env.AI_AGENT_KEY;

const AI_MODELS = [
  AI_AGENT_URL,                              
  AI_AGENT_URL.replace("gpt-4o", "gpt-4o-mini"), 
  AI_AGENT_URL.replace("gpt-4o", "gpt-3.5-turbo"),
];

export const askAgent = async (question, context = "") => {
  for (const url of AI_MODELS) {
    try {

      const response = await axios.post(
        url,
        {
          model: url.includes("gpt-3.5") ? "gpt-3.5-turbo" : url.split("/").pop(),
          messages: [
            {
              role: "system",
              content:
                "You are an AI assistant that helps retrieve and explain data from MongoDB.",
            },
            {
              role: "user",
              content: `${question}\nContext: ${context}`,
            },
          ],
          temperature: 0.4,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": AI_AGENT_KEY,
          },
        }
      );

      // console.log("AI Agent raw response:", response.data);

      return response.data.choices?.[0]?.message?.content || "No answer received.";
    } catch (error) {
      const detail = error.response?.data?.detail || error.message;
      if (detail?.includes("limit") || detail?.includes("quota")) continue;
      throw new Error(`AI Agent request failed: ${detail}`);
    }
  }

  return "AI service unavailable right now. Please try again later.";
};

