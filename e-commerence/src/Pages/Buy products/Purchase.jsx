import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Purchase = () => {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();

  const [customize, setCustomize] = useState(false);
  const [customType, setCustomType] = useState('');
  const [paymentMode, setPaymentMode] = useState('');

  const [productName, setProductName] = useState(product?.title || '');
  const [productPrice, setProductPrice] = useState(product?.price || '');
  const [quantity, setQuantity] = useState(1);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [customValue, setCustomValue] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !customerName || !customerEmail || !mobileNo || !address || !paymentMode) {
      return;
    }

    const purchaseData = {
      product_name: productName,
      product_price: Number(productPrice) * Number(quantity),
      quantity: Number(quantity),
      customization: customize ? customType : 'no',
      custom_value: customize ? customValue : '',
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

      setTimeout(() => {
        navigate("/confirm", { state: purchaseData });
      }, 500);
    } catch (error) {
      console.error("Error saving purchase:", error);
      
    }
  };

  return (
    <div className="p-6 mt-18 text-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-6 w-full max-w-4xl mx-auto shadow-md"
      >
        <h2 className="text-center font-bold text-2xl mb-6">Purchase Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="text-left space-y-4">
            <div>
              <label className="block font-semibold">Product Name</label>
              <input type="text" value={productName} readOnly className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-semibold">Quantity</label>
              <input type="number" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full border p-2 rounded" />
            </div>
            <div>
              <p className="mt-2 font-semibold">Total Price: ₹{Number(productPrice) * Number(quantity)}</p>
            </div>

            <div>
              <label className="block font-semibold">Customization</label>
              <div className="flex gap-4">
                <label>
                  <input type="radio" name="customization" value="yes" onChange={() => setCustomize(true)} className="mr-1" />
                  Yes
                </label>
                <label>
                  <input type="radio" name="customization" value="no" onChange={() => { setCustomize(false); setCustomType(''); setCustomValue(''); }} className="mr-1" />
                  No
                </label>
              </div>

              {customize && (
                <div className="mt-2">
                  <label className="block font-semibold">Customize by</label>
                  <div className="flex gap-4">
                    <label>
                      <input type="radio" name="custom_type" value="image" checked={customType === 'image'} onChange={() => { setCustomType('image'); setCustomValue(''); }} className="mr-1" />
                      Image
                    </label>
                    <label>
                      <input type="radio" name="custom_type" value="name" checked={customType === 'name'} onChange={() => { setCustomType('name'); setCustomValue(''); }} className="mr-1" />
                      Name
                    </label>
                  </div>
                  {customType === 'name' && (
                    <input type="text" placeholder="Enter name" value={customValue} onChange={(e) => setCustomValue(e.target.value)} className="w-full border p-2 rounded mt-2" />
                  )}
                  {customType === 'image' && (
                    <input type="file" accept="image/*" onChange={(e) => setCustomValue(e.target.files[0]?.name)} className="block mt-2" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="text-left space-y-4">
            <div>
              <label className="block font-semibold">Customer Name</label>
              <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-semibold">Mobile Number</label>
              <input type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block font-semibold">Address</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border p-2 rounded" rows={3}></textarea>
            </div>
            <div>
              <label className="block font-semibold">Payment Mode</label>
              <div className="flex gap-4">
                <label>
                  <input type="radio" name="payment_mode" value="online_payment" onChange={() => setPaymentMode('online_payment')} className="mr-1" />
                  Online Payment
                </label>
                <label>
                  <input type="radio" name="payment_mode" value="cash" onChange={() => setPaymentMode('cash')} className="mr-1" />
                  Cash
                </label>
              </div>
              {paymentMode === 'cash' && (
                <div className="mt-2 text-sm text-gray-500 italic">Cash will be collected on delivery.</div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button type="submit" className="bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-3 text-white font-bold rounded hover:opacity-90">
            Purchase
          </button>
        </div>
      </form>

    </div>
  );
};

export default Purchase;
