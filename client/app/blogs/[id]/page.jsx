"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BlogDetail() {
  const params = useParams();
  const id = params.id;

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/blogs/${id}`)
        .then(res => res.json())
        .then(data => setBlog(data));
    }
  }, [id]);

  if (!blog) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <a
          href="/from-the-book"
          className="text-green-700 flex items-center mb-4 hover:underline"
        >
          ← Back to From the Book
        </a>

        {/* Blog Header */}
        <div className="mb-4">
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs mr-2">
            {blog.category || "Education"}
          </span>
          <span className="text-gray-500 text-sm">{blog.readTime || "8 min read"}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="mb-2 text-gray-700">Author: {blog.author || "Unknown"}</div>
        <div className="mb-4 italic text-gray-600">
          Source: {blog.source || ""}
        </div>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="rounded-xl w-full max-h-[320px] object-cover mb-8"
          />
        )}

        {/* Subscriber check */}
        {isSubscriber ? (
          <>
            <div className="bg-white rounded-xl p-4 mb-4 shadow">
              <div className="font-bold mb-2">Summary</div>
              <div className="text-gray-700 mb-3">{blog.summary}</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="font-bold text-xl mb-2">Full Article</div>
              <div
                className="prose max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>

            </div>
          </>
        ) : (
          <SubscribePrompt />
        )}
      </div>
    </div>
  );
}
