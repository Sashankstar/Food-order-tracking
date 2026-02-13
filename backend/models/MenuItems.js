import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

export default mongoose.model("MenuItem", menuItemSchema);
