import MenuItem from "../models/MenuItems.js";

export const getMenu = async (req, res) => {
  const items = await MenuItem.find({}, { _id: 0 });
  res.json(items);
};
