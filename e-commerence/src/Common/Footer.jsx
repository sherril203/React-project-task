import React from 'react';
import { Link } from 'react-router'; 
import { SiInstagram } from 'react-icons/si';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoIosMailUnread } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 p-10 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Links Section */}
        <div>
          <h2 className="font-bold text-xl mb-4">Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-800">Home</Link></li>
            <li><Link to="/products" className="hover:text-gray-800">Products</Link></li>
            <li><Link to="/contact" className="hover:text-gray-800">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="font-bold text-xl mb-4">Contact</h2>
          <ul className="space-y-2">
            <li className="flex gap-2 items-center">
              <a
                href="mailto:productsworld@gmail.com"
                className="hover:underline flex gap-2 items-center"
              >
                <IoIosMailUnread size={22} /> productsworld@gmail.com
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <a
                href="tel:1234567890"
                className="hover:underline flex gap-2 items-center"
              >
                <IoCall size={22} /> 1234567890
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-bold text-xl mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <SiInstagram size={25} className="hover:text-pink-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={25} className="hover:text-sky-400" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={25} className="hover:text-blue-600" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={25} className="hover:text-red-600" />
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-black mt-8">
        © 2025 DIY Arts. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
