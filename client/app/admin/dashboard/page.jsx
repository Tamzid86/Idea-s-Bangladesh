"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Search, X, ThumbsUp, Plus } from "lucide-react";
import { Editor } from '@tinymce/tinymce-react';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catModal, setCatModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [catLoading, setCatLoading] = useState(false);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 


  const [subscribers, setSubscribers] = useState([]);
const [showSubscribers, setShowSubscribers] = useState(false);

useEffect(() => {
  // Load subscribers only when modal is opened (or you can preload if you want)
  if (showSubscribers) {
    axios.get(`${apiUrl}/subscribers`)
      .then(res => setSubscribers(res.data))
      .catch(() => setSubscribers([]));
  }
}, [showSubscribers]);


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
        const res = await axios.get(`${apiUrl}/blogs`, {
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

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    setCatLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/category`);
      setCategories(res.data);
    } catch {
      setCategories([]);
    }
    setCatLoading(false);
  };

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
      category: blog.category || ""
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
        `${apiUrl}/blogs/${id}`,
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
        `${apiUrl}/blogs/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete.");
    }
    setDeleting(false);
  };

  const handleAddCategory = async () => {
    if (!newCat.trim()) return;
    setCatLoading(true);
    try {
      console.log("Adding category:", newCat);
      await axios.post(`${apiUrl}/category`, { name: newCat });
      setNewCat("");
      setCatModal(false);
      fetchCategories();
    } catch {
      alert("Failed to add category: " + (err.response?.data?.message || err.message));
      console.log("Category error", err);
    }
    setCatLoading(false);
  };

  const handleRemoveCategory = async (catId) => {
    setCatLoading(true);
    try {
      await axios.delete(`${apiUrl}/category/${catId}`);
      fetchCategories();
    } catch {
      alert("Failed to delete category");
    }
    setCatLoading(false);
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
    category: ""
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
    formData.append("category", form.category);

    try {
      await axios.post(`${apiUrl}/create-blog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Blog created successfully!");
      setForm({
        title: "",
        summary: "",
        description: "",
        read_time: "",
        image: null,
        category: "",
      });
      if (fileInput.current) fileInput.current.value = "";
      setTimeout(() => {
        setShowModal(false);
        setSuccess("");
      }, 1000);
      setBlogs((prev) => [...prev, form]); 
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
            <Link href={"/admin/dashboard/create-blog"}>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition"
              
            >
              Create Blog
            </button>
            
            </Link>
            
            <button
              className="bg-green-100 text-green-800 px-4 py-2 rounded font-semibold shadow hover:bg-green-200 transition flex items-center gap-2"
              onClick={() => setCatModal(true)}
            >
             Manage Categories
            </button>
            <Link href="/admin/dashboard/newsletter">
            <button
              className="bg-blue-200 text-blue-800 px-4 py-2 rounded font-semibold shadow hover:bg-blue-300 transition"
            >
              Newsletter
              
            </button>
            </Link>
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
                {/* <div className="mb-3">
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
                </div> */}
                <div className="mb-3">
                    <label className="font-semibold">Description</label>
                    <Editor
                      apiKey="savl4o4p433ju0hjmyzv5vjqb5u5fw3wrw4s6nhozac5253z"
                      value={form.description}
                      init={{
                          plugins: 'image table lists link code',
                          toolbar:
                            'undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table image link code',
                          automatic_uploads: true,
                          images_upload_url: `${apiUrl}/upload-inline-image`,
                          paste_data_images: true,
                        }}
                      onEditorChange={(content) => setForm({ ...form, description: content })}
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
                <div className="mb-5">
                  <label className="font-semibold">Category</label>
                  <select
                    name="category"
                    required
                    value={form.category}
                    onChange={handleInputChange}
                    className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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

      {/* Modal: Manage Categories */}
      <AnimatePresence>
        {catModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCatModal(false)}
            />
            <motion.div
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md rounded-2xl shadow-2xl p-7"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-green-700">Manage Categories</h3>
                <button onClick={() => setCatModal(false)}>
                  <X size={24} className="text-gray-400 hover:text-green-700" />
                </button>
              </div>
              <div>
                <div className="mb-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="New category"
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    className="flex-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600"
                    disabled={catLoading}
                  >
                    Add
                  </button>
                </div>
                <div>
                  {categories.length === 0 ? (
                    <div className="text-gray-400 text-sm">No categories yet.</div>
                  ) : (
                    <ul className="divide-y">
                      {categories.map(cat => (
                        <li key={cat._id} className="py-2 flex justify-between items-center">
                          <span className="text-gray-800">{cat.name}</span>
                          <button
                            onClick={() => handleRemoveCategory(cat._id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={catLoading}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
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
           <button
            className="ml-2 flex items-center bg-green-100 text-green-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-200 transition border border-green-200"
            onClick={() => setShowSubscribers(true)}
            title="Show Subscribers"
            type="button"
          >
            Subscribers: 
            <span className="ml-2 font-bold">{subscribers.length > 0 ? subscribers.length : "..."}</span>
          </button>
        </div>

        {/* Blog List */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-white rounded-xl shadow-sm">
            <thead>
              <tr className="bg-green-50 text-green-800 font-bold">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Summary</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400">
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
                    <td className="p-4 text-sm">{blog.category || <span className="text-gray-400">—</span>}</td>
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
                          <select
                            className="border px-2 py-1 rounded"
                            name="category"
                            value={editForm.category}
                            onChange={handleEditChange}
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                          </select>
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
      <AnimatePresence>
  {showSubscribers && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowSubscribers(false)}
      />
      <motion.div
        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-green-700">Subscribers</h2>
          <button onClick={() => setShowSubscribers(false)}>
            <X size={26} className="text-gray-400 hover:text-green-700" />
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto">
          {subscribers.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No subscribers found.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-green-800">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(sub => (
                  <tr key={sub._id}>
                    <td className="py-2">{sub.name}</td>
                    <td className="py-2">{sub.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

    </div>
  );
}
