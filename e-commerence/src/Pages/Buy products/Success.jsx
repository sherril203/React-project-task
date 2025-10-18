// src/pages/Success.jsx
import React from 'react';
import { useLocation } from 'react-router';

const Success = () => {
  const { state } = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-10">
      <h2 className="text-3xl font-bold text-green-700 mb-4">✅ Order Successful!</h2>
      <p className="text-lg">Order ID: <strong>{state?.order_id}</strong></p>
      <p className="text-md mt-2">Thank you, {state?.customer_name}! Your order has been placed.</p>
    </div>
  );
};

export default Success;
