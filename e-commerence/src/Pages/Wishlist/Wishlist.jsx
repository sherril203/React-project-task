import React, { useEffect, useState } from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import { useNavigate } from 'react-router';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const handleMoveToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemInCart = existingCart.find((cartItem) => cartItem.id === item.id);

    let updatedCart;
    if (itemInCart) {
      updatedCart = existingCart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...existingCart, { ...item, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    handleRemove(item.id);
    alert('Moved to cart!');
  };

  const handleGoToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <h2 className="text-3xl font-bold text-center mt-24 mb-6">Your Wishlist</h2>

      <div className="max-w-6xl mx-auto w-full px-4 pb-20">
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-md shadow hover:shadow-lg transition flex flex-col justify-between"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain mb-4 cursor-pointer"
                  onClick={() => handleGoToProduct(item.id)}
                />
                <h3
                  className="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-amber-500"
                  onClick={() => handleGoToProduct(item.id)}
                >
                  {item.title}
                </h3>
                <p className="text-gray-800 font-bold mb-1">₹{item.price}</p>
                <p className="text-sm text-gray-500 mb-3">{item.category}</p>

                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="bg-amber-500 text-white p-2 rounded text-sm hover:bg-amber-600"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white p-2 rounded text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
