import React, { useEffect, useState } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from 'react-router'; // ✅ Fixed import
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate(); // ✅ For programmatic navigation

  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">User not found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className='bg-stone-100 min-h-screen flex flex-col mt-20'>
      <Navbar />
      <div className='flex-grow flex justify-center items-start mt-10 mb-10'>
        <div className='rounded p-6 bg-white w-full max-w-md shadow-md' data-aos="fade-up">
          <h2 className='text-3xl font-bold text-center mb-4'>Profile</h2>
          <div className='flex justify-center mb-2'>
            <MdAccountCircle size={150} />
          </div>

          {/* User Info */}
          <div className='space-y-3'>
            <h3 className='text-center text-lg font-medium'>
              {user.username}
            </h3>
            <h3 className='text-center text-lg font-medium'>
              Email: {user.email}
            </h3>
            <h3 className='text-center text-lg font-medium'>
              Address:<br /> {user.address || "No address added yet"}
            </h3>
            <h3 className='text-center text-lg font-medium'>
              Mobile no:<br /> {user.mobile || "N/A"}
            </h3>
            <h3 className='text-center text-lg font-medium'>
              Location:<br /> {user.location || "N/A"}
            </h3>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-center gap-3 mt-6'>
            <Link to="/editProfile" className='px-4 py-2 bg-gradient-to-l from-fuchsia-200 to-pink-300 rounded hover:opacity-90 transition'>
              Edit Profile
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("user"); 
                navigate("/"); 
              }}
              className="px-4 py-2 bg-gradient-to-l from-fuchsia-200 to-pink-300 rounded hover:opacity-90 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
