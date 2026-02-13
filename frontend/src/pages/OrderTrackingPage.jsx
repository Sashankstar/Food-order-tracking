
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../App";
import { CheckCircle, Clock, Truck, Package, Home } from "lucide-react";
import { motion } from "framer-motion";

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [fetchOrder]);

  const statuses = [
    { name: "Order Received", icon: CheckCircle, description: "Your order has been confirmed" },
    { name: "Preparing", icon: Clock, description: "Chef is preparing your food" },
    { name: "Out for Delivery", icon: Truck, description: "On the way to you" },
    { name: "Delivered", icon: Package, description: "Enjoy your meal!" }
  ];

  const getCurrentStatusIndex = () => {
    if (!order?.status) return 0;
    const index = statuses.findIndex(s => s.name === order.status);
    return index === -1 ? 0 : index;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#FF5500] border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">Order not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-[#FF5500] text-white rounded-full px-8 py-4 font-bold"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const currentStatusIndex = getCurrentStatusIndex();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#FF5500] to-[#FF8800] text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2"
          >
            Order Tracking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg"
          >
            Order ID: {order.id?.substring(0, 8).toUpperCase()}
          </motion.p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 relative">

          <div className="relative pl-10">
            {statuses.map((status, index) => {
              const Icon = status.icon;
              const isActive = index <= currentStatusIndex;

              return (
                <div key={status.name} className="relative mb-12">

                  {/* Vertical Line */}
                  {index < statuses.length - 1 && (
                    <div
                      className={`absolute left-3 top-10 w-1 h-16 ${
                        index < currentStatusIndex
                          ? "bg-[#00CC66]"
                          : "bg-gray-300"
                      }`}
                    />
                  )}

                  {/* Circle + Content */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        isActive
                          ? "bg-[#00CC66] text-white"
                          : "bg-gray-300 text-gray-500"

                      }`}
                    >
                      <Icon size={27} />
                    </div>

                    <div>
                      <h3
                        className={`font-bold ${
                          isActive ? "text-black" : "text-gray-400"
                        }`}
                      >
                        {status.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {status.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Order Details</h2>

          {order.items?.map((item, index) => (
            <div key={index} className="flex justify-between mb-4">
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <span className="font-bold text-[#FF5500]">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total</span>
            <span className="text-[#FF5500]">
              ${Number(order.total).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Home size={24} className="text-[#FF5500]" />
            Delivery Information
          </h2>

          <p><strong>Name:</strong> {order.delivery_details?.name}</p>
          <p><strong>Address:</strong> {order.delivery_details?.address}</p>
          <p><strong>Phone:</strong> {order.delivery_details?.phone}</p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-[#FF5500] border-2 border-[#FF5500]/20 rounded-full px-8 py-4 font-bold"
          >
            Order More Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
