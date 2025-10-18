import React, { useEffect, useState } from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleCancel = (id) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmed) return;

    const updatedOrders = orders.filter(order => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <h2 className="text-center font-bold text-3xl text-stone-700 mt-20 mb-8">My Orders</h2>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {orders.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{order.product_name}</h3>
              <p className="text-gray-600"><strong>Quantity:</strong> {order.quantity}</p>
              <p className="text-gray-600"><strong>Total Price:</strong> ₹{order.product_price}</p>
              <p className="text-gray-600"><strong>Customer:</strong> {order.customer_name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {order.customer_email}</p>
              <p className="text-gray-600"><strong>Mobile:</strong> {order.mobile_no}</p>
              <p className="text-gray-600"><strong>Address:</strong> {order.address}</p>
              <p className="text-gray-600"><strong>Payment Mode:</strong> {order.payment_mode}</p>
              <p className="text-gray-600"><strong>Status:</strong> {order.status || 'Pending'}</p>
              
              <button
                onClick={() => handleCancel(order.id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
