import React from 'react';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const Homepage = () => {
  return (
    <div className='bg-gray-50 '>
      <Navbar />
      {/* Add your homepage content here */}
      <div className="p-14 mt-10">
        <h1 className="text-3xl font-bold">Welcome to Arts World!</h1>
        <p className="mt-2 text-lg">Explore amazing art products and services.</p>
      </div>
      <Footer/>
    </div>
  );
};

export default Homepage;
