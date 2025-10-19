import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Navbar from '../../Common/Navbar';

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [form, setForm] = useState({
    product_name: '',
    quantity: 1,
    customer_name: '',
    customer_email: '',
    mobile_no: '',
    address: '',
    payment_mode: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setForm((prev) => ({
        ...prev,
        product_name: product.name || '', 
        quantity: product.quantity || 1,
      }));
      setTotalPrice(product.totalPrice || product.price || 0);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const pricePerItem = product.price || 0;
      setTotalPrice(pricePerItem * form.quantity);
    }
  }, [form.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in form) {
      if (!form[key]) {
        alert(`Please enter ${key.replace('_', ' ')}`);
        return;
      }
    }

    const order = {
      ...form,
      id: Date.now(),
      product_price: totalPrice,
      status: 'Pending',
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    alert('Order placed successfully!');
    navigate('/');
  };

  if (!product) {
    return (
      <div className="text-center mt-20 text-xl text-gray-700">
        No product selected.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 mt-16 rounded shadow max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h2 className="text-2xl font-bold col-span-full text-center">
          Purchase Form
        </h2>

        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={form.product_name}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="customer_email"
            value={form.customer_email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mobile Number</label>
          <input
            type="tel"
            name="mobile_no"
            value={form.mobile_no}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block mb-1 font-medium">Payment Mode</label>
          <div className="flex gap-4 mt-1">
            <label>
              <input
                type="radio"
                name="payment_mode"
                value="Online Payment"
                checked={form.payment_mode === 'Online Payment'}
                onChange={handleChange}
              />
              <span className="ml-2">Online Payment</span>
            </label>
            <label>
              <input
                type="radio"
                name="payment_mode"
                value="Cash"
                checked={form.payment_mode === 'Cash'}
                onChange={handleChange}
              />
              <span className="ml-2">Cash</span>
            </label>
          </div>
        </div>

        <div className="col-span-full">
          <p className="font-semibold mt-4">
            Total Price: ₹{totalPrice.toFixed(2)}
          </p>
        </div>

        <div className="col-span-full flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold"
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default Purchase;
