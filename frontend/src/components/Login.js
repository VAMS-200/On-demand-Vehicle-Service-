import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, User, Lock } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/auth/login", formData);
      if (res.data.success && res.data.user) {
        alert("✅ Login successful!");
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        const role = user.role.trim().toLowerCase();

        if (role === "customer") navigate("/customer-dashboard");
        else if (role === "serviceman") navigate("/service-dashboard");
      } else {
        alert(res.data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed due to server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-900/80 border border-gray-700 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-4">
          <LogIn className="text-cyan-400" size={44} />
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="customer">Customer</option>
            <option value="serviceMan">Service Man</option>
          </select>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md font-semibold transition duration-300 shadow-md hover:shadow-cyan-500/30"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
