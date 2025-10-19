import React, { useEffect, useState } from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';  
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Products = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

 
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    let result = [...data];

    if (search) {
      result = result.filter(item =>
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
  }, [search, sortOption, data]);

  // Add to Cart
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = existingCart.find(item => item.id === product.id);

    const updatedCart = existingItem
      ? existingCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...existingCart, { ...product, quantity: 1 }];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(existingItem ? 'Quantity updated in cart!' : 'Item added to cart!');
  };


  const handleBuyNow = (product) => {
    const quantity = 1;
    const unitPrice = Number(product.price);
    const totalPrice = (quantity * unitPrice).toFixed(2);

    navigate('/purchase', {
      state: {
        product: {
          name: product.title,   
          price: unitPrice,
          quantity,
          totalPrice
        }
      }
    });
  };


  const toggleWishlist = (product) => {
    const existingWishlist = [...wishlist];
    const index = existingWishlist.findIndex(item => item.id === product.id);

    let updatedWishlist;

    if (index > -1) {
      updatedWishlist = existingWishlist.filter(item => item.id !== product.id);
      alert('Removed from wishlist!');
    } else {
      updatedWishlist = [...existingWishlist, product];
      alert('Added to wishlist!');
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const isWishlisted = (productId) =>
    wishlist.some(item => item.id === productId);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <h2 className="font-bold text-3xl text-center mt-20 mb-6">Products</h2>

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
        {loading ? (
          <p className="text-center col-span-full text-gray-500 text-xl">Loading products...</p>
        ) : filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="relative bg-white shadow-md p-4 rounded-md hover:shadow-lg transition"
            >
             
              <button
                onClick={() => toggleWishlist(item)}
                className="absolute top-2 right-2 text-red-500"
                title={isWishlisted(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {isWishlisted(item.id) ? <FaHeart size={30} /> : <FaRegHeart size={30} />}
              </button>

              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-amber-500 transition">
                  {item.title}
                </h3>
              </Link>

              <p className="text-gray-600 mb-1">⭐ {item.rating?.rate} / 5</p>
              <p className="text-gray-800 font-bold mb-1">₹{item.price}</p>
              <p className="text-sm text-gray-500 mb-3">{item.category}</p>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-amber-400 p-2 rounded text-white text-sm w-full hover:bg-amber-500"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-xl">No products found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
