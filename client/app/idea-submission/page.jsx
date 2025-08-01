"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import Navbar from "../../components/Navbar/page";
import { Editor } from "@tinymce/tinymce-react";

export default function SubmitIdeaPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [subscriberName, setSubscriberName] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: ""
  });
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 200;
  const fileRef = useRef();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Function to count words in text (excluding HTML tags)
  const countWords = (text) => {
    if (!text) return 0;
    // Remove HTML tags and count words
    const plainText = text.replace(/<[^>]*>/g, '').trim();
    if (!plainText) return 0;
    return plainText.split(/\s+/).length;
  };

  // Handle description change with word limit
  const handleDescriptionChange = (content) => {
    const currentWordCount = countWords(content);

    if (currentWordCount <= maxWords) {
      setForm({ ...form, description: content });
      setWordCount(currentWordCount);
    }
    // If word count exceeds limit, don't update the content
  };
  // Check subscription on mount
  useEffect(() => {
    const name = localStorage.getItem("subscriberName");
    setSubscriberName(name || "");
  }, []);

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
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("author", subscriberName); // Attach author
      if (image) formData.append("image", image);

      const res = await fetch(`${apiUrl}/submit-idea`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Your idea has been submitted for review!");
        setForm({ title: "", description: "" }); // Reset form state
        setWordCount(0); // Reset word count
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

  // If not subscribed, block form and prompt user
  if (!subscriberName) {
    return (
      <div className="bg-[#EDF4EE] min-h-screen font-[Nunito] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 text-center"
          >
            <AlertTriangle size={40} className="mx-auto mb-3 text-yellow-500" />
            <div className="text-lg font-bold mb-1 text-gray-800">
              You must subscribe before submitting your idea!
            </div>
            <div className="text-gray-600 mb-4">
              Please subscribe with your email to share your idea.
            </div>
            {/* Optionally: add a subscribe button/link here */}
          </motion.div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-[#EDF4EE] min-h-screen font-[Nunito]">
      <Navbar />
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
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter a title"
                className="w-full px-4 py-3 rounded-lg border border-green-100 focus:border-[#7ED6B2] focus:ring-2 focus:ring-[#D6F3E9] bg-green-50/30 transition"
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-gray-700">Description</label>
                <div className="text-sm text-gray-500">
                  <span className={`${wordCount >= maxWords ? 'text-red-500 font-semibold' : wordCount >= maxWords * 0.8 ? 'text-yellow-600' : 'text-gray-500'}`}>
                    {wordCount}/{maxWords} words
                  </span>
                </div>
              </div>
              <Editor
                apiKey="savl4o4p433ju0hjmyzv5vjqb5u5fw3wrw4s6nhozac5253z"
                value={form.description}
                init={{
                  plugins: "image table lists link code wordcount",
                  toolbar:
                    "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table image link code",
                  automatic_uploads: true,
                  images_upload_url:
                    `${apiUrl}/upload-inline-image`,
                  paste_data_images: true,
                  setup: (editor) => {
                    editor.on('keydown', (e) => {
                      const currentWordCount = countWords(editor.getContent());
                      // Prevent typing if word limit is reached (except for deletion keys)
                      if (currentWordCount >= maxWords &&
                        e.keyCode !== 8 && // Backspace
                        e.keyCode !== 46 && // Delete
                        e.keyCode !== 37 && // Left arrow
                        e.keyCode !== 38 && // Up arrow
                        e.keyCode !== 39 && // Right arrow
                        e.keyCode !== 40 && // Down arrow
                        !e.ctrlKey && !e.metaKey) { // Allow Ctrl/Cmd shortcuts
                        e.preventDefault();
                      }
                    });
                  }
                }}
                onEditorChange={handleDescriptionChange}
              />
              {wordCount >= maxWords && (
                <p className="text-red-500 text-xs mt-1">
                  Word limit reached. You cannot add more words.
                </p>
              )}
            </div>
            {/* Image upload */}
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Main Image (optional)</label>
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
