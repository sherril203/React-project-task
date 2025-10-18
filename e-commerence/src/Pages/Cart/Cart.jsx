import React, { useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import { Link } from "react-router";
import Navbar from "../../Common/Navbar";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeItem = (id) => {
    if (!window.confirm("Remove this item from cart?")) return;

    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const clearCart = () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) return;

    localStorage.removeItem("cart");
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <h2 className="text-center font-bold text-3xl text-stone-700 p-5 mt-20">
        Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link to="/products">
            <button className="mt-4 p-2 bg-amber-600 text-white rounded hover:bg-amber-400">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 mb-10">
            {cart.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-64 h-64 object-contain rounded mb-3"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  <strong>Price:</strong> ₹{item.price}
                </p>
                <p className="text-gray-600">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-20 px-4">
            <div className="bg-white rounded-lg p-5 shadow-md text-right">
              <p className="text-xl font-bold text-stone-700">
                Total: ₹{totalPrice.toFixed(2)}
              </p>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
