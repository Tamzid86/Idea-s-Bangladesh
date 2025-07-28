"use client";
import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import jsPDF from "jspdf";

// Helper for formatted date
function formatDate(dt) {
  if (!dt) return "";
  const date = new Date(dt);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Fetch image URL as base64
async function toBase64(url) {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function BlogDetailsPage({ params }) {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const router = useRouter();

  // Check subscription on mount
  useEffect(() => {
    const email = localStorage.getItem("subscriberEmail");
    const name = localStorage.getItem("subscriberName");
    setIsSubscriber(Boolean(email && name));
  }, []);

  // Disable select/copy/right-click
  useEffect(() => {
    document.body.classList.add("no-copy-protect");
    const stopEvent = (e) => e.preventDefault();
    document.addEventListener("contextmenu", stopEvent);
    document.addEventListener("copy", stopEvent);
    document.addEventListener("cut", stopEvent);
    return () => {
      document.body.classList.remove("no-copy-protect");
      document.removeEventListener("contextmenu", stopEvent);
      document.removeEventListener("copy", stopEvent);
      document.removeEventListener("cut", stopEvent);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Download as PDF, styled like a blog post
  const handleDownloadPdf = async () => {
    if (!blog) return;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const marginX = 40;
    let y = 50;

    // Title (wrap)
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    const maxTitleWidth = 500;
    const titleLines = doc.splitTextToSize(blog.title || "Blog", maxTitleWidth);
    for (let i = 0; i < titleLines.length; i++) {
      doc.text(titleLines[i], marginX, y);
      y += 28;
    }

    // Category badge
    if (blog.category) {
      doc.setFontSize(11);
      doc.setTextColor(38, 126, 77);
      doc.setFont("helvetica", "bold");
      doc.text(`[${blog.category}]`, marginX + 330, y - 28 * titleLines.length);
    }

    // Author, date, read time
    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120);
    doc.setFont("helvetica", "normal");
    doc.text(`By ${blog.author || "Admin"}`, marginX, y);
    if (blog.read_time) doc.text(`• ${blog.read_time}`, marginX + 170, y);
    doc.text(formatDate(blog.createdAt), marginX + 340, y);
    y += 18;

    // Horizontal line
    doc.setDrawColor(160, 220, 180);
    doc.setLineWidth(1);
    doc.line(marginX, y, marginX + 500, y);
    y += 18;

    // Image (optional)
    if (blog.imageUrl) {
      try {
        const imgData = await toBase64(blog.imageUrl);
        const imgWidth = 180;
        const imgHeight = 180;
        const centerX = marginX + (500 - imgWidth) / 2;
        doc.addImage(imgData, "JPEG", centerX, y, imgWidth, imgHeight, undefined, "FAST");
        y += imgHeight + 20;
      } catch (e) {
        y += 20;
      }
    }

    // Summary
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(35, 120, 60);
    doc.text("Summary", marginX, y);
    y += 18;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    const summaryLines = doc.splitTextToSize(blog.summary || "No summary provided.", 500);
    for (let line of summaryLines) {
      if (y > 760) { doc.addPage(); y = 50; }
      doc.text(line, marginX, y);
      y += 16;
    }
    y += 10;

    // Full Article or Subscribe Notice
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(35, 120, 60);
    doc.text("Full Article", marginX, y);
    y += 18;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(25, 25, 25);

    if (isSubscriber) {
      const articleLines = doc.splitTextToSize(blog.description || "", 500);
      for (let line of articleLines) {
        if (y > 760) { doc.addPage(); y = 50; }
        doc.text(line, marginX, y);
        y += 16;
      }
    } else {
      // Not a subscriber: show subscribe prompt instead
      doc.setTextColor(210, 60, 60);
      const subscribeMsg = "You need to subscribe to read the full article!";
      const subscribeLines = doc.splitTextToSize(subscribeMsg, 500);
      for (let line of subscribeLines) {
        if (y > 760) { doc.addPage(); y = 50; }
        doc.text(line, marginX, y);
        y += 18;
      }
    }

    doc.save((blog.title || "blog") + ".pdf");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fdfa] font-[Nunito]">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fdfa] font-[Nunito]">
        <div className="text-gray-500 text-lg">Blog not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2fbf6] via-white to-[#f6faf7] font-[Nunito] py-6 select-none">
      <style jsx global>{`
        .no-copy-protect,
        .no-copy-protect * {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          pointer-events: auto !important;
        }
      `}</style>
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/Bangla-blogs")}
          className="flex items-center gap-1 text-green-700 hover:underline mb-8 text-sm bg-transparent border-none px-0 py-0"
        >
          <ArrowLeft size={16} /> ফিরে যান
        </button>
        {/* Download as PDF */}
        {/* <button
          onClick={handleDownloadPdf}
          className="mb-5 ml-3 flex items-center gap-2 bg-green-200 text-green-900 px-4 py-2 rounded font-semibold hover:bg-green-300 transition"
        >
          Download as PDF
        </button> */}

        {/* Top */}
        <div className="flex items-center gap-3 mb-2">
          {blog.category && (
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
              {blog.category}
            </span>
          )}
          {blog.read_time && (
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <svg width="15" height="15" fill="none" className="inline">
                <circle cx="7.5" cy="7.5" r="7.5" fill="#E5E7EB" />
                <path
                  d="M7.5 3.5v4l2.5 1.5"
                  stroke="#6B7280"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {blog.read_time}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-3xl font-extrabold text-gray-900 mb-1">
          {blog.title}
        </h1>
        <div className="text-gray-600 text-sm mb-1">
          <span className="font-semibold">Author:</span>{" "}
          {blog.author || "Admin"}
        </div>

        {/* Image */}
        {blog.imageUrl && (
          <div className="my-6 rounded-xl overflow-hidden shadow">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-64 object-cover object-center rounded-xl"
              draggable={false}
            />
          </div>
        )}

        {/* Summary */}
        <div className="bg-white rounded-xl shadow border mb-7">
          <div className="px-6 py-4">
            <div className="font-bold text-base mb-2">Summary</div>
            <div className="text-gray-700 text-sm">
              {blog.summary || "No summary provided."}
            </div>
          </div>
        </div>

        {/* Full Article */}
        <div>
          <h2 className="font-bold text-xl mb-2">Full Article</h2>
          {isSubscriber ? (
            <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
            </div>
          ) : (
            <div className="text-red-600 font-semibold bg-red-50 rounded-lg px-6 py-6 shadow text-base mb-8">
              You need to <span className="underline font-bold">subscribe</span> first to read the full article!
            </div>
          )}
        </div>

        {/* Back Button (bottom) */}
        <div className="mt-10">
          <button
            onClick={() => router.push("/Bangla-blogs")}
            className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-green-50 border border-gray-200"
          >
            <ArrowLeft size={16} /> ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
}
