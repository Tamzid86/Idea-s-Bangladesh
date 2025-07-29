"use client"
import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/page";
import AdCard from "../../components/AdCard/page";
import Pagination from "../../components/Pagination/page";

export default function FromTheBook() {
  const [blogs, setBlogs] = useState([]);
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
  // Fetch blogs
  useEffect(() => {
    fetch(`${apiUrl}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  // Fetch ads
  useEffect(() => {
    fetch(`${apiUrl}/ads`)
      .then((res) => res.json())
      .then((data) => setAds(data));
  }, []);

  // Search + Pagination logic
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );
  const blogsPerPage = 2;
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <a href="/" className="text-green-700 flex items-center mb-2 hover:underline">
          ← Back to Home
        </a>
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <span>📖</span> From the Book
        </h1>
        <p className="text-gray-600 mb-8">
          Curated ideas and insights from published works and research, adapted for Bangladesh's unique context and challenges.
        </p>
        <input
          type="text"
          placeholder="Search ideas or titles…"
          className="w-full p-3 rounded-lg border mb-8 shadow-sm"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>

          {/* Ads Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="font-semibold mb-2 text-lg">Sponsored</div>
            {ads.map(ad => (
              <AdCard key={ad.id || ad._id} ad={ad} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
