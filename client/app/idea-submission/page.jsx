"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

// Navbar (reuse everywhere)
function Navbar() {
  return (
          <nav className="flex justify-between items-center py-4 px-40 bg-white shadow-sm sticky top-0 z-50">
        <div className="bg-gradient-to-r from-[#95C9AC] to-[#C5F8C8] bg-clip-text text-transparent text-2xl font-extrabold">Idea&apos;s Bangladesh</div>
        <div className="space-x-8 hidden md:flex">
          <a href="/home" className="hover:text-[#95C9AC] font-medium transition">Home</a>
          <a href="/about" className="hover:text-[#95C9AC] font-medium transition">About</a>
          <a href="/contact" className="hover:text-[#95C9AC] font-medium transition">Contact</a>
        </div>
        <motion.button
          whileHover={{ scale: 1.07 }}
          className="bg-[#91C5A9] text-black px-5 py-1 rounded transition font-medium hover:bg-green-400"
        >
          Subscribe
        </motion.button>
      </nav>
  );
}

export default function SubmitIdeaPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setImage(file || null);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // API Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", e.target.title.value);
      formData.append("description", e.target.description.value);
      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:5000/api/submit-idea", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Your idea has been submitted for review!");
        e.target.reset();
        removeImage();
      } else {
        setError(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4500);
    }
  };

  return (
    <div className="bg-[#EDF4EE] min-h-screen font-[Nunito]">
      <Navbar />
      {/* Page container */}
      <div className="pt-28 pb-16 px-3 min-h-screen flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-7 border border-green-50 relative"
        >
          <motion.h1
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-[#6EC2A4] tracking-tight"
          >
            Submit Your Idea
          </motion.h1>

          {/* Success/Error */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-lg shadow"
            >
              <CheckCircle2 size={21} /> {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-lg shadow"
            >
              <AlertTriangle size={20} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Title</label>
              <input
                name="title"
                type="text"
                required
                placeholder="Enter a catchy title"
                className="w-full px-4 py-3 rounded-lg border border-green-100 focus:border-[#7ED6B2] focus:ring-2 focus:ring-[#D6F3E9] bg-green-50/30 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700">Description</label>
              <textarea
                name="description"
                required
                rows={5}
                placeholder="Describe your idea in detail..."
                className="w-full px-4 py-3 rounded-lg border border-green-100 focus:border-[#7ED6B2] focus:ring-2 focus:ring-[#D6F3E9] bg-green-50/30 transition resize-none"
              />
            </div>
            {/* Image upload */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Image (optional)</label>
              <div className="flex gap-4 items-center">
                <label className="cursor-pointer flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg text-green-700 font-medium hover:bg-green-200 transition border border-green-200 shadow-sm">
                  <UploadCloud size={20} /> {image ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    ref={fileRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {preview && (
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg shadow border border-green-100"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-red-100 transition"
                      onClick={removeImage}
                      title="Remove image"
                    >
                      <X size={17} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-1">
                JPEG, PNG, or WebP. Max 2MB.
              </p>
            </div>
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-4 bg-[#8CE4C2] hover:bg-[#6EC2A4] text-green-900 font-bold py-3 rounded-xl shadow transition text-lg flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>Submit Idea</>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
