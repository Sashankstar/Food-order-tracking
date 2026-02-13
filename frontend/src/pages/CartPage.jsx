import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const updateQuantity = (itemId, delta) => {
    setCart(cart.map(cartItem =>
      cartItem.item.id === itemId
        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + delta) }
        : cartItem
    ));
  };

  const removeItem = (itemId) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            data-testid="back-to-menu-button"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-[#FF5500] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Your Cart</h1>
            <p className="text-sm text-gray-500">{cart.length} items</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
            data-testid="empty-cart"
          >
            <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#FF5500] text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Browse Menu
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((cartItem) => (
                <motion.div
                  key={cartItem.item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-black/5"
                  data-testid={`cart-item-${cartItem.item.id}`}
                >
                  <div className="flex gap-4">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#1A1A1A] mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        {cartItem.item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{cartItem.item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-[#FF5500] price-tag">
                          ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            data-testid={`decrease-quantity-${cartItem.item.id}`}
                            onClick={() => updateQuantity(cartItem.item.id, -1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold w-8 text-center" data-testid={`quantity-${cartItem.item.id}`}>
                            {cartItem.quantity}
                          </span>
                          <button
                            data-testid={`increase-quantity-${cartItem.item.id}`}
                            onClick={() => updateQuantity(cartItem.item.id, 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            data-testid={`remove-item-${cartItem.item.id}`}
                            onClick={() => removeItem(cartItem.item.id)}
                            className="ml-2 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-black/5 p-6 sticky top-4"
                data-testid="order-summary"
              >
                <h3 className="text-xl font-bold mb-6 text-[#1A1A1A]" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span data-testid="subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span data-testid="delivery-fee">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-[#1A1A1A]">
                    <span>Total</span>
                    <span className="text-[#FF5500]" data-testid="total">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  data-testid="proceed-to-checkout-button"
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#FF5500] text-white rounded-full px-8 py-4 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;