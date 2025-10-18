import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Footer from '../../Common/Footer';
import Navbar from '../../Common/Navbar';


const Confirmationpage = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();



  const saveOrderToLocalStorage = (order) => {
    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existing, order]));
  };

  const handleSubmit = () => {
    const order = {
      ...data,
      order_id: "COD-" + Date.now(),
      payment_status: "Pending (Cash)",
      placed_at: new Date().toISOString(),
    };

    saveOrderToLocalStorage(order);
    navigate("/success", { state: order });
  };

  if (!data) {
    return <div className="text-center p-20">No data available for confirmation.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center mt-20 mb-20">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mt-15" data-aos="fade-up">
          <h2 className="text-center text-2xl font-bold mb-6">Product Confirmation</h2>

          <div className="space-y-3 text-gray-700">
            <p><strong>Product:</strong> {data.product_name}</p>
            <p><strong>Quantity:</strong> {data.quantity}</p>
            <p><strong>Total Price:</strong> ${data.product_price}</p>
            <p><strong>Customer Name:</strong> {data.customer_name}</p>
            <p><strong>Email:</strong> {data.customer_email}</p>
            <p><strong>Mobile:</strong> {data.mobile_no}</p>
            <p><strong>Address:</strong> {data.address}</p>
            <p><strong>Payment Mode:</strong> {data.payment_mode}</p>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 text-white font-bold rounded-lg shadow hover:opacity-90 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmationpage;
