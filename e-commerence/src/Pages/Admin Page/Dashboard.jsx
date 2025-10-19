import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("GET error:", error.message);
      setError("Failed to load products. Please try again later.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mt-12 mb-2 text-center">Dashboard</h2>
      <h3 className="text-2xl font-semibold mb-6 text-center">Products</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500 mb-4">{error}</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div
              key={product.id} 
              className="border rounded-lg shadow-md p-3 flex flex-col items-center bg-red-100 
              hover:shadow-lg transition-shadow duration-300"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-40 h-40 object-contain mb-4 rounded"
                  loading="lazy"
                />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center bg-gray-200 mb-4 rounded text-gray-500">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2 text-center break-words">
                {product.title}
              </h3>
              <p className="text-gray-700 mb-1">Quantity: N/A</p>
              <p className="text-gray-700 font-semibold">Price: ₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
