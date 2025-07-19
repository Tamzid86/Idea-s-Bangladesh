"use client";
import { useEffect, useState, useRef   } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Search,X, ThumbsUp } from "lucide-react";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
    }
  }, []);

  // Fetch blogs
  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      const token = localStorage.getItem("adminToken"); // JWT
      try {
        const res = await axios.get("http://localhost:5000/api/blogs", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(res.data);
        setFiltered(res.data);
      } catch {
        setBlogs([]);
        setFiltered([]);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  // Filter blogs by search
  useEffect(() => {
    setFiltered(
      blogs.filter((b) =>
        b.title.toLowerCase().includes(search.trim().toLowerCase())
      )
    );
  }, [search, blogs]);

  // Top 3 liked blogs
  const top3 = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  // Handle update
  const startEdit = (blog) => {
    setEditId(blog._id);
    setEditForm({
      title: blog.title,
      description: blog.description,
      summary: blog.summary,
      imageUrl: blog.imageUrl,
    });
  };
  const cancelEdit = () => setEditId(null);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, ...editForm, updatedAt: new Date() } : b
        )
      );
      setEditId(null);
    } catch {
      alert("Failed to update blog.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    setDeleting(true);
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(
        `http://localhost:5000/api/blogs/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete.");
    }
    setDeleting(false);
  };

    const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInput = useRef();

  // Blog form state
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    read_time: "",
    image: null,
  });

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("summary", form.summary);
    formData.append("description", form.description);
    formData.append("read_time", form.read_time);
    if (form.image) formData.append("image", form.image);

    try {
      await axios.post("http://localhost:5000/api/create-blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Blog created successfully!");
      setForm({
        title: "",
        summary: "",
        description: "",
        read_time: "",
        image: null,
      });
      if (fileInput.current) fileInput.current.value = "";
      setTimeout(() => {
        setShowModal(false);
        setSuccess("");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog.");
    } finally {
      setCreating(false);
    }
  };

return (
  <div className="min-h-screen bg-[#F5FAF7] pb-20 font-[Nunito]">
    {/* Header */}
    <div className="bg-gradient-to-r from-[#edf4ee] via-[#95c9ac] to-[#c5f8c8] py-10 mb-10 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-green-700 mb-2">
            Admin Dashboard
          </h1>
          <div className="text-gray-600">
            Manage your blogs and see what&apos;s trending
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-5 md:mt-0">
          {/* New Buttons */}
          <button
            className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition"
            onClick={() => setShowModal(true)}
          >
            Create Blog
          </button>
          <button
            className="bg-blue-200 text-blue-800 px-4 py-2 rounded font-semibold shadow hover:bg-blue-300 transition"
          >
            Newsletter
          </button>
          <Link href="/admin/dashboard/ads">
            <button className="bg-green-200 text-green-800 px-4 py-2 rounded font-semibold shadow hover:bg-green-300 transition">
              Handle Ads
            </button>
          </Link>
          <Link href="/admin/dashboard/user-request">
            <button className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold shadow hover:bg-green-200 transition">
              Handle User Request
            </button>
          </Link>
          <button
            className="bg-red-100 text-red-700 px-4 py-2 rounded font-semibold shadow hover:bg-red-200 transition"
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    {/* Modal: Create Blog */}
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          />
          <motion.div
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-700">Create Blog</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={26} className="text-gray-400 hover:text-green-700" />
              </button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleInputChange}
                  className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                />
              </div>
              <div className="mb-3">
                <label className="font-semibold">Summary</label>
                <input
                  type="text"
                  name="summary"
                  required
                  value={form.summary}
                  onChange={handleInputChange}
                  className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                />
              </div>
              <div className="mb-3">
                <label className="font-semibold">Description</label>
                <textarea
                  name="description"
                  required
                  value={form.description}
                  onChange={handleInputChange}
                  rows={7}
                  className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100 resize-vertical"
                  style={{ minHeight: 120 }}
                />
              </div>
              <div className="mb-3">
                <label className="font-semibold">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={fileInput}
                  onChange={handleInputChange}
                  className="w-full mt-1"
                />
              </div>
              <div className="mb-5">
                <label className="font-semibold">Read Time</label>
                <input
                  type="text"
                  name="read_time"
                  required
                  value={form.read_time}
                  onChange={handleInputChange}
                  className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                  placeholder="e.g. 5 min read"
                />
              </div>
              {error && (
                <div className="mb-3 text-red-500 text-sm">{error}</div>
              )}
              {success && (
                <div className="mb-3 text-green-700 text-sm">{success}</div>
              )}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition mt-2"
                disabled={creating}
              >
                {creating ? "Creating..." : "Create Blog"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* Blog Management */}
    <div className="max-w-6xl mx-auto px-4">
      {/* Search bar */}
      <div className="flex items-center mb-6 gap-3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-green-400" size={18} />
          <input
            className="pl-10 pr-3 py-2 border rounded-lg w-full focus:ring focus:ring-green-100"
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Blog List */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left bg-white rounded-xl shadow-sm">
          <thead>
            <tr className="bg-green-50 text-green-800 font-bold">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Summary</th>
              {/* <th className="py-3 px-4">Likes</th> */}
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No blogs found.
                  </td>
                </tr>
              )}
              {filtered.map((blog, idx) => (
                <motion.tr
                  key={blog._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: idx * 0.04 }}
                  className="border-b last:border-b-0"
                >
                  <td className="p-4">
                    {blog.imageUrl ? (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-16 h-12 object-cover rounded shadow"
                      />
                    ) : (
                      <div
                        className="w-16 h-12 flex items-center justify-center rounded shadow bg-gradient-to-br from-green-100 to-green-300 font-bold text-2xl text-green-800 select-none"
                        style={{ letterSpacing: 2 }}
                      >
                        {blog.title?.[0]?.toUpperCase() || "B"}
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-bold max-w-[200px] truncate">{blog.title}</td>
                  <td className="p-4 text-sm max-w-[260px] line-clamp-2">{blog.summary}</td>
                  {/* <td className="p-4 text-green-700">{blog.likes}</td> */}
                  <td className="p-4 text-xs text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {editId === blog._id ? (
                      <form
                        onSubmit={e => handleEditSubmit(e, blog._id)}
                        className="flex flex-col gap-2"
                      >
                        <input
                          className="border px-2 py-1 rounded"
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                        />
                        <textarea
                          className="border px-2 py-1 rounded"
                          name="summary"
                          value={editForm.summary}
                          onChange={handleEditChange}
                        />
                        <textarea
                          className="w-full p-3 border rounded-lg resize-y min-h-[180px] focus:outline-none focus:ring focus:ring-green-200 transition"
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="px-3 py-1 bg-green-200 text-green-900 font-semibold rounded hover:bg-green-300"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => startEdit(blog)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(blog._id)}
                          disabled={deleting}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {loading && (
          <div className="text-center text-gray-500 py-10">Loading blogs...</div>
        )}
      </div>
    </div>
  </div>
);

}
