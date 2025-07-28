"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BanglaBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs/bangla")
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-8">বাংলা ব্লগসমূহ</h1>
      
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500">কোনো বাংলা ব্লগ পাওয়া যায়নি।</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{blog.summary}</p>
              <Link
                href={`/from-the-book/${blog._id}`}
                className="text-green-700 font-semibold hover:underline"
              >
                সম্পূর্ণ পড়ুন →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
