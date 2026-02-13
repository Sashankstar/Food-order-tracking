import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configuration/db.js";
import menuRoutes from "./routes/MenuRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGINS }));

app.get("/api", (req, res) => {
  res.json({ message: " API" });
});

app.use("/api", menuRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`));
}
export default app; 