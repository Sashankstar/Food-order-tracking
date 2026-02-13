import express from "express";
import { createOrder, getOrder,getAllOrders } from "../controllers/OrderControllers.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders/:id", getOrder);
router.get("/orders", getAllOrders);

export default router;
