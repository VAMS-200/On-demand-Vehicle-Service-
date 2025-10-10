import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, User, Lock, Phone, Badge } from "lucide-react";
import "./Auth.css"; // optional

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
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
      console.log("Sending registration request:", formData);

      const res = await axios.post("http://localhost:5001/auth/register", formData);
      console.log("Frontend received:", res.data);

      if (res.data.user) {
        alert("✅ Registration successful! Please login.");
        navigate("/login", { replace: true });
      } else {
        alert(res.data.msg || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err.response ? err.response.data : err.message);
      alert(err.response?.data?.msg || "Registration failed due to server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900/90 shadow-xl rounded-xl p-8 border border-gray-800">
        <div className="flex justify-center mb-4">
          <UserPlus className="text-blue-500" size={42} />
        </div>

        <h2 className="text-3xl font-bold text-center  text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Badge className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="customer">Customer</option>
            <option value="serviceMan">Service Man</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-300 shadow-md hover:shadow-blue-400/30"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
