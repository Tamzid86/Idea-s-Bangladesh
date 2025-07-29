"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${apiUrl}/login`, form);
      // Assuming backend returns { token: "..." }
      localStorage.setItem("adminToken", res.data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#edf4ee] via-[#95c9ac] to-[#c5f8c8]">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white rounded-2xl shadow-lg border border-green-100 px-10 py-10 w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <div className="text-3xl font-black text-green-600 mb-1 tracking-tight">
            Admin Login
          </div>
          <div className="text-gray-500 text-sm">Idea&apos;s Bangladesh</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 transition"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm mt-1"
            >
              {error}
            </motion.div>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-[#91C5A9] to-[#C5F8C8] text-green-900 font-bold rounded-lg shadow-md hover:bg-[#A7D7B6] transition flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-green-700" viewBox="0 0 24 24">
                <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
