import express from "express";
import { getMenu } from "../controllers/MenuControllers.js";

const router = express.Router();
router.get("/menu", getMenu);

export default router;
