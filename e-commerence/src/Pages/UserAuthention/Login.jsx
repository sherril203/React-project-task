import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }


    const mockUser = { email, name: "User" };
    localStorage.setItem("user", JSON.stringify(mockUser));

    setEmail("");
    setPassword("");
    setError("");
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="bg-white mt-16 border border-stone-300 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-center font-bold text-3xl mb-6 text-stone-800">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>

          <p className="text-center text-stone-700">
            New Account?{" "}
            <Link to="/signup" className="text-blue-600 font-bold underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
