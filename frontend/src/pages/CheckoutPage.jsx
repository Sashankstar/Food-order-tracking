import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { ArrowLeft, User, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const CheckoutPage = ({ cart, setCart, setOrderId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const orderPlacedRef = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const orderData = {
      items: cart.map(cartItem => ({
        item_id: cartItem.item.id,
        name: cartItem.item.name,
        price: cartItem.item.price,
        quantity: cartItem.quantity
      })),
      delivery_details: formData,
      total: total
    };

    const response = await axios.post(`${API}/orders`, orderData);

    orderPlacedRef.current = true;
    setCart([]);
    navigate(`/order/${response.data.id}`);

  } catch (error) {
    console.error('Error creating order:', error);
    alert('Failed to place order. Please try again.');
    setLoading(false);
  }
};


  useEffect(() => {
    if (cart.length === 0 && !orderPlacedRef.current) {
      navigate('/cart');
    }
  }, [cart.length, navigate]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            data-testid="back-to-cart-button"
            onClick={() => navigate('/cart')}
            className="text-gray-600 hover:text-[#FF5500] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Checkout</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-black/5"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A]" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Delivery Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="name">
                    <User size={16} className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    data-testid="checkout-name-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-transparent focus:border-[#FF5500]/50 focus:bg-white rounded-xl h-12 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="address">
                    <MapPin size={16} className="inline mr-2" />
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    data-testid="checkout-address-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-transparent focus:border-[#FF5500]/50 focus:bg-white rounded-xl px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
                    rows="3"
                    placeholder="123 Main St, Apt 4B, City, State 12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="phone">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    data-testid="checkout-phone-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-transparent focus:border-[#FF5500]/50 focus:bg-white rounded-xl h-12 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button
                  type="submit"
                  data-testid="place-order-button"
                  disabled={loading}
                  className="w-full bg-[#FF5500] text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-black/5 p-6 sticky top-4"
            >
              <h3 className="text-xl font-bold mb-6 text-[#1A1A1A]" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {cartItem.item.name} x{cartItem.quantity}
                    </span>
                    <span className="font-bold">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-[#1A1A1A] pt-2">
                    <span>Total</span>
                    <span className="text-[#FF5500]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;