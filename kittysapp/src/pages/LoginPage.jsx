import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "", fullName: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    try {
      const res = await axios.post(endpoint, formData);
      console.log("Success:", res.data);
      // store token, redirect, etc.
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl"
            />
          )}
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-xl"
          />
          <button type="submit" className="bg-purple-600 text-white py-3 w-full rounded-xl">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span
            className="text-purple-700 font-bold cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;