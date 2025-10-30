
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import manager from "../utils/nlpManager.js";


// Status - Drop 

let lastContext = { intent: null, filter: {} };
export async function processAdminQuery(req, res) {
  try {
    const { message } = req.body;
    if (!message) {
      return res
        .status(400)
        .json({ success: false, error: "Message required" });
    }

    //Run NLP
    const nlpResponse = await manager.process("en", message);

    //Check confidence
    if (!nlpResponse.intent || nlpResponse.score < 0.6) {
      return res.json({
        success: true,
        reply: "I’m not sure I understood. Try asking about products or users.",
      });
    }

    //Handle greetings / smalltalk
    if (nlpResponse.intent === "greet" || nlpResponse.intent === "ask.health") {
      return res.json({ success: true, reply: nlpResponse.answer });
    }

    let collection, Model, filter = {};

    // Use last context for refinements
    if (nlpResponse.intent.includes("refine") && lastContext.intent) {
      filter = { ...lastContext.filter };
    }

    // Parse entities for reasoning
    nlpResponse.entities.forEach((ent) => {
      const value = ent.resolution?.value || ent.option || ent.sourceText;

      // PRICE ENTITIES
      if (ent.entity === "price") filter.price = { $lt: Number(value) };

      if (ent.entity === "price_comparison") {
        if (/above|greater|over/i.test(ent.sourceText)) filter.price = { $gt: Number(value) };
        if (/below|less|under/i.test(ent.sourceText)) filter.price = { $lt: Number(value) };
      }

      if (ent.entity === "price_range") {
        const [min, max] = ent.sourceText.match(/\d+/g).map(Number);
        filter.price = { $gte: min, $lte: max };
      }

      // CATEGORY / SUBCATEGORY
      if (ent.entity === "category") filter.category = value;
      if (ent.entity === "subCategory") filter.subCategory = value;

      // DATE ENTITY
      if (ent.entity === "date") {
        const now = new Date();
        switch (value.toLowerCase()) {
          case "today":
            filter.createdAt = { $gte: new Date(now.setHours(0,0,0,0)) };
            break;
          case "yesterday":
            const y = new Date();
            y.setDate(y.getDate() - 1);
            filter.createdAt = { $gte: new Date(y.setHours(0,0,0,0)), $lte: new Date(y.setHours(23,59,59,999)) };
            break;
          case "last_week":
            const lastWeekStart = new Date();
            lastWeekStart.setDate(lastWeekStart.getDate() - 7);
            filter.createdAt = { $gte: lastWeekStart };
            break;
          case "last_month":
            const lastMonthStart = new Date();
            lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
            filter.createdAt = { $gte: lastMonthStart };
            break;
        }
      }

      // USERS ENTITIES
      if (ent.entity === "email") filter.email = value;
      if (ent.entity === "name") filter.name = value;
    });

    // BESTSELLER / TRENDING
    if (/bestseller|trending|popular/i.test(message)) filter.bestseller = true;

    //Determine collection/model
    if (nlpResponse.intent.includes("products")) {
      collection = "products";
      Model = Product;
      lastContext = { intent: "search.products", filter };
    }
    if (nlpResponse.intent.includes("users")) {
      collection = "users";
      Model = User;
      lastContext = { intent: "search.users", filter };
    }

    //Fetch from DB
    if (Model) {
      const results = await Model.find(filter).limit(100).lean();
      return res.json({ success: true, data: results });
    }

    //Fallback
    return res.json({
      success: true,
      reply: "Sorry, I didn’t understand. Try asking about products or users.",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
