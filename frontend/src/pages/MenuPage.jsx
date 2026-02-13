import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import { ShoppingCart, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const MenuPage = ({ cart, setCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.item.id === item.id
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const categories = [...new Set(menuItems.map(item => item.category))];


  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1
              className="text-3xl font-bold text-[#FF5500]"
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              CraveWave
            </h1>
            <p className="text-sm text-gray-500">
              Delicious food, delivered fast
            </p>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="relative bg-[#FF5500] text-white rounded-full px-6 py-3 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#00CC66] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FF5500] to-[#FF8800] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "Fredoka, sans-serif" }}
          >
            Hungry? Order Now!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-95"
          >
            Fresh ingredients, amazing flavors, delivered to your door
          </motion.p>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#FF5500] border-r-transparent"></div>
            <p className="mt-4 text-gray-500">
              Loading delicious food...
            </p>
          </div>
        )}

        {!loading &&
          categories.map((category) => {
            const categoryItems = menuItems.filter(
              (item) => item.category === category
            );

            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h3
                  className="text-3xl font-bold mb-6 text-[#1A1A1A]"
                  style={{ fontFamily: "Fredoka, sans-serif" }}
                >
                  {category}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-black/5 overflow-hidden transition-all group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <h4
                          className="text-xl font-bold mb-2 text-[#1A1A1A]"
                          style={{ fontFamily: "Fredoka, sans-serif" }}
                        >
                          {item.name}
                        </h4>

                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-[#FF5500]">
                            ${Number(item.price).toFixed(2)}
                          </span>

                          <button
                            onClick={() => addToCart(item)}
                            className="bg-[#FF5500] text-white rounded-full px-6 py-2 font-bold hover:bg-[#E04B00] hover:scale-105 transition-all duration-300 flex items-center gap-2"
                          >
                            <Plus size={18} />
                            Add
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
      </section>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-[#00CC66] text-white px-6 py-4 rounded-full shadow-xl font-bold"
          >
            Yum, added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;
