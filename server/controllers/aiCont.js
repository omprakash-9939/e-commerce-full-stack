import { askAgent } from "../services/aiAgentService.js";
import { detectCollection, summarizeData } from "../utils/aiHelpers.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { parseToMongoFilter } from "../services/llmService.js";

export const getAnswer = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const detected = detectCollection(question);

    if (detected === "all") {
      const answer = await askAgent(question); 
      return res.status(200).json({
        answer,
        sources: "none",
      });
    }

    const filter = await parseToMongoFilter(question, detected);

    let users = [], orders = [], products = [];

    if (detected === "User") {
      users = await User.find(filter).limit(10);
    } else if (detected === "Order") {
      orders = await Order.find(filter).limit(10);
    } else if (detected === "Product") {
      products = await Product.find(filter).limit(10);
    }

    const summary = summarizeData({ users, orders, products });

    const context =
      users.length || orders.length || products.length
        ? summary
        : "No matching records found in the database.";

    const answer = await askAgent(question, context);

    res.status(200).json({
      answer,
      sources: {
        usersCount: users.length,
        ordersCount: orders.length,
        productsCount: products.length,
      },
    });
  } catch (error) {
    console.error("AI Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
