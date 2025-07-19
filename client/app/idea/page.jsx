"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ArrowLeft } from "lucide-react";
import axios from "axios";
import Footer from "../../components/Footer/page";
import SubscribeButton from "../../components/SubscribeButton/page";


export default function ApprovedIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [shareCopiedId, setShareCopiedId] = useState(null);

  const [ads, setAds] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoadingIdeas(true);
    axios.get("http://localhost:5000/api/approved-ideas")
      .then(res => {
        setIdeas(res.data || []);
        setLoadingIdeas(false);
      })
      .catch(() => setLoadingIdeas(false));
  }, []);

  useEffect(() => {
    setLoadingAds(true);
    axios.get("http://localhost:5000/api/ads")
      .then(res => {
        setAds(res.data || []);
        setLoadingAds(false);
      })
      .catch(() => setLoadingAds(false));
  }, []);

  // Format date from ISO string
  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  // Handler for full article read
  const handleRead = (id) => {
    const subscriberEmail = typeof window !== "undefined" && localStorage.getItem("subscriberEmail");
    const subscriberName = typeof window !== "undefined" && localStorage.getItem("subscriberName");
    if (subscriberEmail && subscriberName) {
      router.push(`/idea/${id}`);
    } else {
      setShowModal(true);
    }
  };

  const handleShare = async (idea) => {
  const shareUrl = `${window.location.origin}/idea/${idea._id}`;
  const shareData = {
    title: idea.title,
    text: idea.description?.slice(0, 100) || "",
    url: shareUrl,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      // fallback below
    }
  }

  try {
    await navigator.clipboard.writeText(shareUrl);
    setShareCopiedId(idea._id);
    setTimeout(() => setShareCopiedId(null), 1600);
  } catch (err) {
    alert("Link: " + shareUrl);
  }
};


  // Search filter
  const filteredIdeas = ideas.filter((idea) =>
    idea.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fdfa] font-[Nunito]">
      {/* Back Button */}
      <div className="max-w-[80%] mx-auto pt-10 flex items-center">
        <button
          className="flex items-center gap-1 text-green-700 hover:underline text-base font-semibold bg-transparent border-none px-0 py-0"
          onClick={() => router.push("/")}
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
      </div>
      {/* Header */}
      <div className="bg-[#EDF7F3] py-8 mt-4">
        <div className="max-w-[80%] mx-auto flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Reader's Innovations
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Turning your visions into inspiration for all.
          </p>
          <div className="mt-3 max-w-xs w-full">
            <input
              type="text"
              className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring focus:ring-green-100 transition"
              placeholder="Search ideas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[95vw] md:max-w-[80%] mx-auto flex flex-col md:flex-row gap-8 px-1 md:px-0 mt-10 mb-10"
      >
        {/* LEFT: IDEAS */}
        <div className="flex-1 space-y-8">
          {loadingIdeas ? (
            <div className="text-center text-gray-400 py-24">Loading...</div>
          ) : filteredIdeas.length === 0 ? (
            <div className="text-center text-gray-400 py-24">No approved ideas found.</div>
          ) : (
            filteredIdeas.map((idea) => (
              <motion.div
                key={idea._id}
                whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(30,100,60,0.08)" }}
                className="flex flex-col md:flex-row items-stretch w-full bg-white rounded-xl overflow-hidden shadow-sm border transition-all duration-200 min-h-[120px]"
              >
                {/* Image or Placeholder */}
              <div
  className="md:w-48 lg:w-56 h-48 flex-shrink-0 flex items-center justify-center p-0 m-0"
  style={{
    width: "12rem",
    height: "12rem",
    minWidth: "12rem",
    maxWidth: "12rem",
    minHeight: "12rem",
    maxHeight: "12rem",
    padding: 0,
    margin: 0
  }}
>
  {idea.imageUrl ? (
    <img
      src={idea.imageUrl}
      alt={idea.title}
      className="w-full h-full object-cover object-center rounded-none"
      style={{
        width: "12rem",
        height: "12rem",
        minWidth: "12rem",
        maxWidth: "12rem",
        minHeight: "12rem",
        maxHeight: "12rem",
      }}
    />
  ) : (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200"
      style={{
        width: "12rem",
        height: "12rem",
        fontWeight: 700,
        fontSize: "3rem",
        color: "#2b5040",
        letterSpacing: "1px",
        textTransform: "uppercase",
        borderRadius: "0.75rem",
        padding: 0,
        margin: 0
      }}
      aria-label="Placeholder image"
    >
      {idea.title?.[0] || "I"}
    </div>
  )}
</div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col flex-1 min-w-0 justify-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                        {idea.author || "Anonymous"}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        {formatDate(idea.submittedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg md:text-xl mb-1 line-clamp-1">
                      {idea.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {idea.description?.slice(0, 120) || "No description."}
                      {idea.description && idea.description.length > 120 ? "..." : ""}
                    </p>
                  </div>
                 <div className="flex gap-2 mt-1">
  <button
    className="bg-green-200 text-green-900 px-5 py-2 rounded font-semibold hover:bg-green-300 transition flex items-center gap-2 text-sm"
    onClick={() => handleRead(idea._id)}
  >
    Read Full Article
    <ArrowUpRight size={16} />
  </button>
  <div className="relative">
    <button
      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded hover:bg-green-50 transition text-sm"
      onClick={() => handleShare(idea)}
      aria-label="Share"
      type="button"
    >
      <svg width={18} height={18} fill="none" stroke="#389a6a" strokeWidth={2.1} viewBox="0 0 24 24">
        <circle cx={6} cy={12} r={2} />
        <circle cx={18} cy={6} r={2} />
        <circle cx={18} cy={18} r={2} />
        <path d="M8.59 13.51l6.83 3.98" />
        <path d="M15.42 6.51l-6.83 3.98" />
      </svg>
      Share
    </button>
    {shareCopiedId === idea._id && (
      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs rounded px-2 py-1 shadow">
        Link Copied!
      </span>
    )}
  </div>
</div>

                </div>
              </motion.div>
            ))
          )}
        </div>
        {/* RIGHT: ADS */}
        {ads.length > 0 && (
          <motion.div className="w-full md:w-[340px] flex flex-col gap-6 mt-10 md:mt-0">
            <div className="mb-2 font-semibold text-gray-700 text-lg">Sponsored</div>
            {ads.map((ad) => (
              <motion.div key={ad._id} className="bg-white rounded-xl shadow border overflow-hidden">
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
                    {ad.link?.length > 30 ? ad.link.slice(0, 28) + "..." : ad.link || "Visit"}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* MODAL for subscribe */}
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
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-green-700">Subscribe Required</h2>
                <button onClick={() => setShowModal(false)}>
                  <X size={26} className="text-gray-400 hover:text-green-700" />
                </button>
              </div>
              <p className="text-gray-700 mb-6">
                You need to subscribe to read the full article. Please subscribe to get access to exclusive content!
              </p>
              <div
                className="w-full  py-2 rounded font-bold "
                onClick={() => setShowModal(false)}
              >
                <SubscribeButton />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
