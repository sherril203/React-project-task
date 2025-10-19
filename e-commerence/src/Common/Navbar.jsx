import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { FaCartShopping, FaCartArrowDown } from "react-icons/fa6";
import { TbHomeFilled } from "react-icons/tb";
import { IoIosCall } from "react-icons/io";
import { IoCloseOutline,IoHeartOutline  } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { LuLogIn, LuPackageCheck } from "react-icons/lu";
import { MdOutlineFeed, MdAccountCircle } from "react-icons/md";
import logo from "../assets/react.svg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(!!user);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    setShowProfile(false);
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-stone-100  z-30">
      <nav className="flex justify-between items-center px-6 py-4">

        <div className="font-extrabold text-stone-700 text-2xl flex items-center">
          <img src={logo} alt="Logo" width="50" className="mr-2" />
          <Link to="/">Products World</Link>
        </div>


        <div className="hidden lg:block">
          <ul className="flex gap-8 text-lg font-medium text-stone-700">
            <li className="hover:text-stone-500 transition">
              <Link to="/" className="flex items-center gap-2">
                <TbHomeFilled /> Home
              </Link>
            </li>
            <li className="hover:text-stone-500 transition">
              <Link to="/products" className="flex items-center gap-2">
                <FaCartShopping /> Products
              </Link>
            </li>
            <li className="hover:text-stone-500 transition">
              <Link to="/contact" className="flex items-center gap-2">
                <IoIosCall /> Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
         
              <Link
                to="/user/cart"
                className="flex items-center gap-2 text-stone-700 text-lg font-semibold 
                px-4 py-2 border border-stone-300 rounded-xl hover:bg-stone-500 hover:text-white transition"
              >
                <FaCartArrowDown className="text-xl" /> Cart
              </Link>
               <Link
                to="/user/wishlist"
                className="flex items-center gap-2 text-stone-700 text-lg font-semibold 
                px-4 py-2 border border-stone-300 rounded-xl hover:bg-stone-500 hover:text-white transition"
              >
                <IoHeartOutline size={30}/> 
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 text-stone-700 text-lg font-semibold 
                  px-4 py-2 border border-stone-300 rounded-xl hover:bg-stone-500 hover:text-white transition"
                >
                  <MdAccountCircle className="text-2xl" /> Profile
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md border border-gray-200 text-stone-700">
                    <Link
                      to="/user/profile"
                      onClick={() => setShowProfile(false)}
                      className="block px-4 py-2 hover:bg-stone-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/user/orders"
                      onClick={() => setShowProfile(false)}
                      className="block px-4 py-2 hover:bg-stone-100"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-stone-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">
              <button className="text-stone-700 text-base font-semibold px-4 py-2 border border-black rounded-xl hover:bg-stone-500 hover:text-white transition">
                <LuLogIn className="inline-block mr-2" /> Login
              </button>
            </Link>
          )}
        </div>

     
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-xl bg-stone-300 text-stone-700 hover:bg-white/30 transition"
        >
          {open ? <IoCloseOutline size={24} /> : <RxHamburgerMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-stone-100 text-stone-700 px-4 py-6 border-t border-stone-200">
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <TbHomeFilled /> Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <FaCartShopping /> Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <IoIosCall /> Contact
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/user/profile" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <MdAccountCircle /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/user/cart" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <FaCartArrowDown /> Cart
                  </Link>
                </li>
                 <li>
                  <Link to="/user/wishlist" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <IoHeartOutline /> WishList
                  </Link>
                </li>
                <li>
                  <Link to="/user/orders" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                    <LuPackageCheck /> My Orders
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <BiLogOut /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <LuLogIn /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
