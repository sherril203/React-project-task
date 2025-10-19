import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'; 
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const alreadyWishlisted = wishlist.some(item => item.id === data.id);
        setIsWishlisted(alreadyWishlisted);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const increase = () => setCount(prev => prev + 1);
  const decrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = existingCart.findIndex(item => item.id === product.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += count;
    } else {
      existingCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: count
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert("Item added to cart!");
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.some(item => item.id === product.id);

    let updatedWishlist;
    if (exists) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
      alert('Removed from Wishlist');
    } else {
      updatedWishlist = [...wishlist, product];
      alert('Added to Wishlist');
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setIsWishlisted(!exists);
  };

  const handleBuyNow = () => {
    if (!product) return;

    const unitPrice = Number(product.price);
    const totalPrice = (count * unitPrice).toFixed(2);

    navigate('/purchase', {
      state: {
        product: {
          name: product.title,
          price: unitPrice,
          quantity: count,
          totalPrice
        }
      }
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-stone-100">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  const unitPrice = Number(product.price);
  const totalAmount = unitPrice * count;

  return (
    <div className="bg-stone-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="p-6 flex-1">
        <div className="bg-white shadow p-6 rounded max-w-4xl mx-auto flex flex-col md:flex-row gap-6 mt-20">
          <div className="flex-1 flex justify-center items-center relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-sm h-auto rounded-lg object-contain"
            />

            <button
              onClick={toggleWishlist}
              className="absolute top-2 right-2 text-red-500 text-xl"
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {isWishlisted ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
            <div className="flex items-center gap-2 mb-2 text-yellow-500">
              <FaStar size={20} />
              <span className="text-black font-medium">{product.rating?.rate || 'N/A'}</span>
            </div>

            <p className="text-gray-600 text-lg mb-1">Unit Price: ₹{unitPrice}</p>
            <p className="text-gray-600 text-lg mb-2">Category: {product.category}</p>

            <div className="flex items-center gap-3 my-3">
              <button onClick={decrease} className="bg-amber-400 px-3 py-1 rounded text-white">-</button>
              <span className="font-semibold text-lg">{count}</span>
              <button onClick={increase} className="bg-amber-400 px-3 py-1 rounded text-white">+</button>
            </div>

            <p className="text-xl font-bold mb-3">Total: ₹{totalAmount.toFixed(2)}</p>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {product.description}</p>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductInfo;
