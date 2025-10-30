import express from "express";
import { processAdminQuery } from "../controllers/aiController.js";

const router = express.Router();
router.post("/admin-chat", processAdminQuery);

export default router;
