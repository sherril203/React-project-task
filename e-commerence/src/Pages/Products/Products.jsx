import React, { useEffect, useState } from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Products = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndProcessProducts = async () => {
      try {
        if (data.length === 0) {
          const response = await axios.get('https://fakestoreapi.com/products');
          setData(response.data);
          return;
        }

        let result = [...data];

        if (search) {
          result = result.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        switch (sortOption) {
          case 'priceLowHigh':
            result.sort((a, b) => a.price - b.price);
            break;
          case 'priceHighLow':
            result.sort((a, b) => b.price - a.price);
            break;
          case 'ratingHighLow':
            result.sort((a, b) => b.rating?.rate - a.rating?.rate);
            break;
          case 'nameAZ':
            result.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'nameZA':
            result.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            break;
        }

        setFilteredData(result);
      } catch (error) {
        console.error('Error fetching or processing products:', error);
      }
    };

    fetchAndProcessProducts();
  }, [data.length, search, sortOption]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Quantity updated in cart!');
    } else {
      const newItem = { ...product, quantity: 1 };
      const updatedCart = [...existingCart, newItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Item added to cart!');
    }
  };

  const handleBuyNow = (product) => {
    navigate('/purchase', { state: { product } });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <h2 className="font-bold text-3xl text-center mt-20 mb-6">Products</h2>

      {/* 🔍 Search + Sorting Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 max-w-6xl mx-auto w-full px-4">
        <input
          type="search"
          placeholder="Search products..."
          className="p-3 border border-gray-300 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 rounded w-full md:w-1/4"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="ratingHighLow">Rating: High to Low</option>
          <option value="nameAZ">Name: A to Z</option>
          <option value="nameZA">Name: Z to A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 pb-16">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md p-4 rounded-md hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-1">⭐ {item.rating?.rate} / 5</p>
              <p className="text-gray-800 font-bold mb-1">${item.price}</p>
              <p className="text-sm text-gray-500 mb-3">{item.category}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-amber-400 p-2 rounded text-white text-sm w-full hover:bg-amber-500"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(item)}
                  className="bg-amber-500 p-2 rounded text-white text-sm w-full hover:bg-amber-600"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-xl">
            No products found.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
