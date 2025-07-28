"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Image as ImageIcon, ThumbsUp, Share2, X  } from "lucide-react";
import axios from "axios";
import Footer from "../../components/Footer/page";
// import BlogCard from "../../components/BlogCard/page";
import SubscribeButton from "../../components/SubscribeButton/page";

// Pagination component
function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex gap-3 justify-center mt-8">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded bg-green-100 text-green-800 font-semibold disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-2 text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded bg-green-100 text-green-800 font-semibold disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2,
    },
  },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
};
const adVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 20 } },
};

export default function FromBookPage() {
  const [blogs, setBlogs] = useState([]);
  const [ads, setAds] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [currentSummary, setCurrentSummary] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch blogs and ads from API
  useEffect(() => {
    setLoadingBlogs(true);
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => {
        setBlogs(res.data);
        setLoadingBlogs(false);
      })
      .catch(() => setLoadingBlogs(false));
  }, []);

  useEffect(() => {
    setLoadingAds(true);
    axios
      .get("http://localhost:5000/api/ads")
      .then((res) => {
        setAds(res.data || []);
        setLoadingAds(false);
      })
      .catch(() => setLoadingAds(false));
  }, []);

  // Filtering and Pagination
  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase())||
    blog.category?.toLowerCase().includes(search.toLowerCase())
  );
  const blogsPerPage = 5;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  );

  // Handlers
  const handleShowSummary = (summary) => {
    setCurrentSummary(summary || "No summary provided.");
    setShowSummary(true);
    document.body.style.overflow = "hidden";
  };
  const handleClose = () => {
    setShowSummary(false);
    setTimeout(() => (document.body.style.overflow = "auto"), 200);
  };


function BlogCard({ blog, handleShowSummary }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(blog.likes || 0);
  const [liked, setLiked] = useState(false);

  const subscriberEmail =
    typeof window !== "undefined" && localStorage.getItem("subscriberEmail");
  const subscriberName =
    typeof window !== "undefined" && localStorage.getItem("subscriberName");

  const handleRead = () => {
    if (subscriberEmail && subscriberName) {
      router.push(`/from-the-book/${blog._id}`);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (subscriberEmail && blog.likedBy?.includes(subscriberEmail)) {
      setLiked(true);
    }
  }, [blog.likedBy, subscriberEmail]);

  const handleLike = async () => {
    if (!subscriberEmail) {
      alert("You must subscribe to like a blog");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/blogs/${blog._id}/like`, {
        email: subscriberEmail,
      });

      setLikes(res.data.likes);       
      setLiked(res.data.liked);       
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/from-the-book/${blog._id}`;
    const shareData = {
      title: blog.title,
      text: blog.summary,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {}
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1500);
    } catch (err) {
      alert("Link: " + shareUrl);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${blog._id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/comments", {
        blogId: blog._id,
        name: subscriberName,
        email: subscriberEmail,
        content: newComment,
      });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const openCommentModal = () => {
    setCommentModal(true);
    fetchComments();
  };

  return (
    <>
      {/* Blog Card */}
      <motion.div
        whileHover={{
          y: -3,
          boxShadow: "0 8px 32px rgba(30,100,60,0.09)",
        }}
        className="flex flex-col sm:flex-row w-full bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-200"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image or title initials */}
        <div className="w-full sm:w-48 lg:w-56 h-48 sm:h-auto flex items-center justify-center flex-shrink-0">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 font-bold text-4xl uppercase text-green-900">
              {blog.title?.[0] || "B"}
            </div>
          )}
        </div>
  
        {/* Content */}
        <div className="p-4 md:p-6 flex flex-col flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                {blog.author || "Admin"}
              </span>
              {blog.category && (
                <span className="bg-green-50 text-green-800 text-xs px-3 py-1 rounded-full font-semibold border border-green-100">
                  {blog.category}
                </span>
              )}
              {blog.read_time && (
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  ⏱ {blog.read_time}
                </span>
              )}
            </div>
            <h3
              className="font-bold text-base sm:text-lg md:text-xl mb-1 transition-colors duration-200 line-clamp-1"
              style={{ color: hovered ? "#9bcbb2" : "#191919" }}
            >
              {blog.title}
            </h3>
            <p className="text-gray-700 text-sm mb-3 line-clamp-2">
              {blog.summary}
            </p>
          </div>
  
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            <button
              className="bg-green-100 text-green-800 px-5 py-2 rounded font-medium hover:bg-green-200 transition text-sm"
              onClick={() => handleShowSummary(blog.summary)}
            >
              Summary
            </button>
            <button
              className="bg-green-200 text-green-900 px-5 py-2 rounded font-semibold hover:bg-green-300 transition flex items-center gap-2 text-sm"
              onClick={handleRead}
            >
              Full Article <ArrowUpRight size={16} />
            </button>
            <button
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-green-50 transition text-sm"
              onClick={openCommentModal}
            >
              Comments
            </button>
            <button
              onClick={handleLike}
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-green-50 transition"
              title="Like this blog"
            >
              <span className={`text-lg ${liked ? "text-green-600" : "text-gray-500"}`}>
                👍
              </span>
              <span className="text-sm font-medium text-gray-700">{likes}</span>
            </button>
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded hover:bg-green-50 transition text-sm"
                onClick={handleShare}
              >
                <Share2 size={18} />
                Share
              </button>
              {shareCopied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs rounded px-2 py-1 shadow">
                  Link Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
  
      {/* Comment Modal */}
      {commentModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl relative">
            <button
              onClick={() => setCommentModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {comments.length ? (
                comments.map((c, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-gray-700">{c.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              )}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded"
              rows={3}
            />
            <div className="flex justify-end mt-2 gap-2">
              <button
                onClick={() => setCommentModal(false)}
                className="text-gray-500 px-3 py-1"
              >
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
  
}

  return (
    <div className="min-h-screen bg-[#f9fdfa] font-[Nunito]">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
        className="bg-[#EDF7F3] py-10 md:py-14"
      >
        <div className="max-w-[80%] mx-auto">
          <a
            href="/home"
            className="flex items-center gap-2 text-green-700 font-medium mb-3 hover:underline text-sm"
          >
            <span className="text-xl">&#8592;</span>Back to Home
          </a>
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-green-100 rounded-full p-2 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  d="M3 6l9-4 9 4M4 10v10a2 2 0 002 2h12a2 2 0 002-2V10"
                />
              </svg>
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              From the Book
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mb-6">
            Curated ideas and insights from published works and research, adapted for Bangladesh&apos;s unique context and challenges.
          </p>
          <motion.input
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full max-w-lg px-5 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-100 transition bg-white"
            placeholder="Search ideas or categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="max-w-[95vw] md:max-w-[80%] mx-auto flex flex-col md:flex-row gap-8 px-1 md:px-0 mt-10 mb-10"
      >
        {/* LEFT: POSTS */}
        <div className="flex-1 space-y-8">
          {loadingBlogs ? (
            <div className="col-span-full text-center text-gray-400 py-24">
              Loading...
            </div>
          ) : paginatedBlogs.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-24">
              No blogs found.
            </div>
          ) : (
            paginatedBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} handleShowSummary={handleShowSummary} />)
          )}
        </div>
        {/* RIGHT: ADS */}
        {ads.length > 0 && (
          <motion.div
            variants={containerVariant}
            className="w-full md:w-[340px] flex flex-col gap-6 mt-10 md:mt-0"
          >
            <motion.div
              variants={adVariant}
              className="mb-2 font-semibold text-gray-700 text-lg"
            >
              Sponsored
            </motion.div>
            {ads.map((ad) => (
              <motion.div
                key={ad._id}
                variants={adVariant}
                className="bg-white rounded-xl shadow border overflow-hidden"
              >
                <div className="relative">
                  {ad.imageUrl && (
                    <img
                      src={ad.imageUrl}
                      alt={ad.title}
                      className="w-full h-36 object-cover"
                    />
                  )}
                  <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                    Ad
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-1">{ad.title}</div>
                  <div className="text-gray-500 text-sm mb-3">{ad.description}</div>
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-200 text-green-900 px-5 py-2 rounded font-semibold hover:bg-green-300 transition w-full flex items-center justify-center gap-2 text-sm"
                  >
                    {ad.link?.length > 30
                      ? ad.link.slice(0, 28) + "..."
                      : ad.link || "Visit"}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      {/* POPUP MODAL FOR SUMMARY */}
      <AnimatePresence>
        {showSummary && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gradient-to-tr from-green-100/70 via-white/50 to-green-200/60 backdrop-blur-lg"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-green-200/40 to-green-100/10 blur-2xl opacity-80 pointer-events-none" />
                <div className="relative w-[95vw] max-w-lg bg-white rounded-2xl shadow-2xl border border-green-100 px-8 py-7">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-tr from-green-200 to-green-400 text-green-900 rounded-full shadow-sm">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path d="M12 3v2M12 19v2M5.22 5.22l1.42 1.42M17.36 17.36l1.42 1.42M3 12h2m14 0h2M5.22 18.78l1.42-1.42M17.36 6.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </span>
                      <h2 className="text-xl font-bold text-green-800 tracking-tight">Summary</h2>
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="text-gray-400 hover:text-green-600 transition"
                    >
                      <X size={28} />
                    </motion.button>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-r from-green-200 to-green-400 rounded-full mb-4" />
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-700 text-base leading-relaxed whitespace-pre-line"
                    style={{ minHeight: 90 }}
                  >
                    {currentSummary}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
