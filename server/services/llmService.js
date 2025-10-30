import axios from "axios";

const allowedFields = {
  User: ["name", "email", "role", "createdAt", "_id"],
  Order: ["orderId", "status", "notes", "total", "createdAt", "_id"],
  Product: ["name", "price", "category", "stock", "description", "_id"],
};

export async function parseToMongoFilter(userMessage, collection) {
  const apiKey = process.env.OPENAI_API_KEY;

  const fallback = () => {
    // Very basic fallback: detect "price < 100" pattern
    const m = userMessage.match(/price\s*(?:<|less than)\s*(\d+)/i);
    if (m) return { price: { $lt: Number(m[1]) } };
    return {};
  };

  if (!apiKey) return fallback();

  try {
    const prompt = `
You are an assistant that converts user text into MongoDB filters.
Collection: ${collection}
Allowed fields: ${allowedFields[collection].join(", ")}
Example of document fields: ${JSON.stringify(
      Object.fromEntries(allowedFields[collection].map((f) => [f, "value"]))
    )}
User request: "${userMessage}"
Return ONLY a valid JSON filter object. No text explanation.
`;

    const resp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    const text = resp.data.choices?.[0]?.message?.content || "{}";
    return JSON.parse(text);
  } catch (err) {
    console.error("AI parsing failed, falling back:", err.message);
    return fallback();
  }
}


// gpt-4o
//gpt-4o-mini