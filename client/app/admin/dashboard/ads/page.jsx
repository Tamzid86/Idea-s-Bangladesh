"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { X, Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminAdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editAd, setEditAd] = useState(null);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    days: 7, // Default expiry
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
    }
  }, []);

  const fileInputRef = useRef();

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/ads");
      setAds(res.data);
    } catch {
      setAds([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else if (name === "days") {
      setForm((prev) => ({ ...prev, days: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.link || !form.days) return;

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("link", form.link);
    fd.append("daysActive", form.days); // <--- Must send this key!

    if (form.image) fd.append("image", form.image);

    try {
      if (editAd) {
        await axios.put(
          `http://localhost:5000/api/ads/${editAd._id}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/ads", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setShowModal(false);
      setEditAd(null);
      setForm({ title: "", description: "", link: "", image: null, days: 7 });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      fetchAds();
    } catch (err) {
      alert("Failed to save ad.");
    }
  };

  const handleEdit = (ad) => {
    // Compute days left from createdAt and expiresAt
    let daysLeft = 7;
    if (ad.expiresAt && ad.createdAt) {
      const left = Math.ceil(
        (new Date(ad.expiresAt) - new Date(ad.createdAt)) / (24 * 60 * 60 * 1000)
      );
      daysLeft = left > 0 ? left : 1;
    }
    setEditAd(ad);
    setForm({
      title: ad.title,
      description: ad.description,
      link: ad.link,
      image: null,
      days: daysLeft,
    });
    setImagePreview(ad.imageUrl || null);
    setShowModal(true);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`);
      fetchAds();
    } catch {
      alert("Failed to delete ad.");
    }
  };

  const openNewAd = () => {
    setEditAd(null);
    setForm({ title: "", description: "", link: "", image: null, days: 7 });
    setImagePreview(null);
    setShowModal(true);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5faf7] font-[Nunito] px-4 py-10 ">
      {/* Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-10">
        {/* Back button */}
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="flex items-center gap-1 text-green-700 hover:text-green-900 font-semibold px-3 py-2 rounded transition hover:bg-green-100"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="text-3xl font-extrabold text-green-700 flex-1 text-center">
          Manage Ads
        </h1>
        <button
          onClick={openNewAd}
          className="flex items-center gap-1 bg-green-200 text-green-800 px-5 py-2 rounded font-bold hover:bg-green-300 transition"
        >
          <Plus size={18} /> Add Ad
        </button>
      </div>
      {/* Ads Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border p-4 overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading...</div>
        ) : ads.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No ads available.</div>
        ) : (
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="border-b text-gray-700 font-bold">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Link</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Expiry Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id} className="border-b hover:bg-green-50 transition group">
                  <td className="py-3 px-4 font-semibold align-middle">{ad.title}</td>
                  <td className="py-3 px-4 align-middle">
                    <a
                      href={ad.link}
                      className="text-green-600 hover:underline break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        maxWidth: 160,
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={ad.link}
                    >
                      {ad.link}
                    </a>
                  </td>
                  <td className="py-3 px-4 align-middle">
                    {ad.imageUrl ? (
                      <img
                        src={ad.imageUrl}
                        alt="ad"
                        className="w-16 h-10 object-cover rounded"
                        style={{ display: "block", margin: "0 auto" }}
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4 align-middle">{formatDate(ad.expiresAt)}</td>
                  <td className="py-3 px-4 align-middle">
                    <div className="flex gap-2 justify-center items-center">
                      <button
                        onClick={() => handleEdit(ad)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-green-700">
                  {editAd ? "Update Ad" : "Add New Ad"}
                </h2>
                <button onClick={() => setShowModal(false)}>
                  <X size={26} className="text-gray-400 hover:text-green-700" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-medium">Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-100"
                    required
                  />
                </div>
                <div>
                  <label className="font-medium">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-100"
                    required
                  />
                </div>
                <div>
                  <label className="font-medium">Link</label>
                  <input
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-100"
                    required
                  />
                </div>
                <div>
                  <label className="font-medium">Ad Expiry (Days)</label>
                  <input
                    name="days"
                    type="number"
                    min={1}
                    max={90}
                    value={form.days}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-100"
                    required
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    The ad will expire and auto-delete after this many days.
                  </div>
                </div>
                <div>
                  <label className="font-medium">Image</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleChange}
                    className="mt-1 block w-full"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="mt-2 rounded w-32 h-16 object-cover border"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-200 text-green-900 py-2 rounded font-bold hover:bg-green-300 transition"
                >
                  {editAd ? "Update" : "Add Ad"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
