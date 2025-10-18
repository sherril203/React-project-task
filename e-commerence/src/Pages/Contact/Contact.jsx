import React from 'react';
import { SiInstagram } from 'react-icons/si';
import { FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa6';
import { IoIosMailUnread } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';


const Contact = () => {
  return (
    <div className="bg-gray-50  min-h-screen flex flex-col">
      <Navbar />

      <h2 className="text-center font-bold text-4xl text-black mt-23 mb-8">
        Contact Us
      </h2>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 max-w-6xl mx-auto w-full px-4 md:px-6 pb-16">

        <div className="space-y-8 w-full max-w-md">
          <div className="bg-white rounded-lg px-8 py-6 shadow-md text-black">
            <div className="flex items-center gap-2 mb-2">
              <IoIosMailUnread size={28} />
              <h3 className="text-lg font-semibold">Email:</h3>
            </div>
            <p className="text-lg ml-8">productsworld@gmail.com</p>

            <div className="flex items-center gap-2 mt-6 mb-2">
              <IoCall size={26} />
              <h3 className="text-lg font-semibold">Mobile No:</h3>
            </div>
            <p className="text-lg ml-8">1234567890</p>
          </div>

          <div className="bg-white rounded-lg px-8 py-6 shadow-md text-black">
            <h3 className="text-2xl font-bold text-center mb-4">Follow Us</h3>
            <div className="flex justify-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <SiInstagram size={30} className="hover:text-pink-500 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={30} className="hover:text-sky-400 transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} className="hover:text-blue-600 transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={32} className="hover:text-red-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>  
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
