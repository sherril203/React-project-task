import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Purchase = () => {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();

  // ✅ Fallback if product is not passed
  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        No product selected. Please go back and choose a product.
      </div>
    );
  }

  // ✅ Use correct keys (product.name, product.price, etc.)
  const [productName] = useState(product?.name || '');
  const [productPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(product?.quantity || 1);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [upiId, setUpiId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !customerName || !customerEmail || !mobileNo || !address || !paymentMode) {
      alert('Please fill all required fields.');
      return;
    }

    const purchaseData = {
      product_name: productName,
      product_price: Number(productPrice) * Number(quantity),
      quantity: Number(quantity),
      customer_name: customerName,
      customer_email: customerEmail,
      mobile_no: mobileNo,
      address,
      payment_mode: paymentMode,
      upi_id: paymentMode === 'upi' ? upiId : '',
      created_at: new Date().toISOString(),
    };

    try {
      const existingPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
      localStorage.setItem("purchases", JSON.stringify([...existingPurchases, purchaseData]));

      navigate("/confirm", { state: purchaseData });
    } catch (error) {
      console.error("Error saving purchase:", error);
    }
  };

  return (
    <div className="p-6 mt-20 text-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-6 w-full max-w-4xl mx-auto shadow-md"
      >
        <h2 className="text-center font-bold text-2xl mb-6">Purchase Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Side: Product Info */}
          <div className="text-left space-y-4">
            <div>
              <label className="block font-semibold">Product Name</label>
              <input type="text" value={productName} readOnly className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-semibold">Quantity</label>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <p className="mt-2 font-semibold">
                Total Price: ₹{Number(productPrice) * Number(quantity)}
              </p>
            </div>
          </div>

          {/* Right Side: Customer Info */}
          <div className="text-left space-y-4">
            <div>
              <label className="block font-semibold">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Mobile Number</label>
              <input
                type="tel"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border p-2 rounded"
                rows={3}
              ></textarea>
            </div>

            {/* Payment */}
            <div>
              <label className="block font-semibold">Payment Mode</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="payment_mode"
                    value="online_payment"
                    onChange={() => setPaymentMode('online_payment')}
                    className="mr-1"
                  />
                  Online Payment
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment_mode"
                    value="cash"
                    onChange={() => setPaymentMode('cash')}
                    className="mr-1"
                  />
                  Cash
                </label>
              </div>
              {paymentMode === 'cash' && (
                <div className="mt-2 text-sm text-gray-500 italic">
                  Cash will be collected on delivery.
                </div>
              )}
              {paymentMode === 'upi' && (
                <div className="mt-2">
                  <label className="block font-semibold">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 text-white font-bold rounded hover:opacity-90"
          >
            Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default Purchase;
