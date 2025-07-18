"use client";
import { useRouter } from "next/navigation";

export default function BlogCard({ blog }) {
  const router = useRouter();

  // Calculate read time fallback
  const readTime = blog.readTime || "8 min read";

  // Button click handler
  const handleRead = () => {
    const subscriberEmail = localStorage.getItem("subscriberEmail");
    const subscriberName = localStorage.getItem("subscriberName");
    if (subscriberEmail && subscriberName) {
      router.push(`/blogs/${blog._id}`);
    } else {
      alert("You must subscribe to read the full article!");
      // Optionally, show a modal instead of alert
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 min-h-[160px]">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
        <span>🕒 {readTime}</span>
      </div>
      <div className="font-bold text-lg">{blog.title}</div>
      <div className="text-gray-600 mb-2 line-clamp-2">{blog.summary}</div>
      <div className="flex gap-2 mt-2">
        <button
          className="border border-green-700 text-green-700 px-4 py-2 rounded hover:bg-green-50"
          onClick={() => alert(blog.summary)}
        >
          Read Summary
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleRead}
        >
          Read Full Article
        </button>
      </div>
    </div>
  );
}
