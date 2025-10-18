import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Check if user already exists
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      setError("User already exists. Please login instead.");
      return;
    }

    // Save user to localStorage
    const newUser = { username, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));

    // Reset fields
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");

    // Redirect to home
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="bg-white mt-16 border border-stone-300 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-center font-bold text-3xl mb-6 text-stone-800">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium text-stone-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-3 rounded border-amber-400 border-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-stone-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-3 rounded border-amber-400 border-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-stone-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded border-amber-400 border-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-amber-400 p-4 rounded text-xl text-white font-semibold hover:bg-amber-500 transition"
          >

            Sign Up
          </button>

          <p className="text-center text-stone-700">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600 font-bold underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
