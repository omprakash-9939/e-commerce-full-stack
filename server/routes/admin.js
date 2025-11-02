import express from "express";
import userModel from "../models/userModel.js";
import { queryLLM } from "../utils/llm.js";

const router = express.Router();

router.post("/query", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: "Message required" });

    // Ask LLM to convert natural language to MongoDB query
    const mongoQueryString = await queryLLM(
      `Convert this natural language request to a Mongoose find query object: "${message}"`
    );

    // Evaluate safely
    let mongoQuery;
    try {
      mongoQuery = eval("(" + mongoQueryString + ")");
    } catch (err) {
      return res.status(400).json({ success: false, error: "LLM could not generate query" });
    }

    const results = await userModel.find(mongoQuery);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
