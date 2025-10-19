import React, { useEffect, useState } from 'react';

const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('orders'));
      if (Array.isArray(storedOrders)) {
        setOrders(storedOrders);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    }
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
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
              <p className="text-gray-600"><strong>Total Price:</strong> ${order.product_price.toFixed(2)}</p>
              <p className="text-gray-600"><strong>Customer:</strong> {order.customer_name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {order.customer_email}</p>
              <p className="text-gray-600"><strong>Mobile:</strong> {order.mobile_no}</p>
              <p className="text-gray-600"><strong>Address:</strong> {order.address}</p>
              <p className="text-gray-600"><strong>Payment Mode:</strong> {order.payment_mode}</p>

              <label className="block font-semibold text-gray-700 mt-4 mb-1" htmlFor={`status-${order.id}`}>
                Status:
              </label>
              <select
                id={`status-${order.id}`}
                value={order.status || 'Pending'}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="w-full border rounded p-2"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default AdminOrders;
