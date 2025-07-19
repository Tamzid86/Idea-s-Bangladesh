"use client";
import { use } from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import jsPDF from "jspdf";
import SubscribeButton from "../../../components/SubscribeButton/page";

function formatDate(dt) {
  if (!dt) return "";
  const date = new Date(dt);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApprovedIdeaDetailPage({ params }) {
  const contentRef = useRef();
  const { id } = use(params);
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const router = useRouter();

  // Check if user is a subscriber on mount
  useEffect(() => {
    const email = localStorage.getItem("subscriberEmail");
    const name = localStorage.getItem("subscriberName");
    setIsSubscriber(Boolean(email && name));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/approved-idea/${id}`)
      .then((res) => {
        setIdea(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.MozUserSelect = "none";
    document.body.style.msUserSelect = "none";
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    return () => {
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.body.style.MozUserSelect = "";
      document.body.style.msUserSelect = "";
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
    };
  }, []);

  const handleDownloadPdf = async () => {
    if (!idea) return;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const marginX = 40;
    let y = 50;

    // Title (wrapped)
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);

    const maxTitleWidth = 500;
    const titleLines = doc.splitTextToSize(idea.title || "Idea", maxTitleWidth);
    for (let i = 0; i < titleLines.length; i++) {
      doc.text(titleLines[i], marginX, y);
      y += 28;
    }

    y += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`By ${idea.author || "Anonymous"}`, marginX, y);
    doc.text(formatDate(idea.submittedAt), marginX + 300, y);
    y += 20;

    doc.setDrawColor(160, 220, 180);
    doc.setLineWidth(1);
    doc.line(marginX, y, marginX + 500, y);
    y += 15;

    if (idea.imageUrl) {
      try {
        const imgData = await toBase64(idea.imageUrl);
        const imgWidth = 180;
        const imgHeight = 180;
        const centerX = marginX + (500 - imgWidth) / 2;
        doc.addImage(imgData, "JPEG", centerX, y, imgWidth, imgHeight, undefined, "FAST");
        y += imgHeight + 18;
      } catch (e) {
        y += 18;
      }
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(35, 120, 60);
    doc.text("Full Description", marginX, y);
    y += 18;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(25, 25, 25);

    if (isSubscriber) {
      const description = idea.description || "";
      const lines = doc.splitTextToSize(description, 500);
      for (let line of lines) {
        if (y > 760) {
          doc.addPage();
          y = 50;
        }
        doc.text(line, marginX, y);
        y += 18;
      }
    } else {
      doc.setTextColor(210, 60, 60);
      const subscribeMsg = "You need to subscribe to read the full description!";
      const subscribeLines = doc.splitTextToSize(subscribeMsg, 500);
      for (let line of subscribeLines) {
        if (y > 760) { doc.addPage(); y = 50; }
        doc.text(line, marginX, y);
        y += 20;
      }
    }

    doc.save((idea?.title || "idea") + ".pdf");
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fdfa] font-[Nunito]">
        <div className="text-gray-500 text-lg select-none">Loading...</div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fdfa] font-[Nunito]">
        <div className="text-gray-500 text-lg select-none">Idea not found.</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#f2fbf6] via-white to-[#f6faf7] font-[Nunito] py-8 px-2"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        pointerEvents: "auto",
      }}
      onCopy={e => e.preventDefault()}
      onCut={e => e.preventDefault()}
      onContextMenu={e => e.preventDefault()}
      onDragStart={e => e.preventDefault()}
    >
      <div ref={contentRef} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-green-100 p-7">
        <button
          onClick={() => router.push("/idea")}
          className="flex items-center gap-1 text-green-700 hover:underline mb-8 text-sm bg-transparent border-none px-0 py-0"
          tabIndex={-1}
        >
          <ArrowLeft size={16} /> Back to All Ideas
        </button>
        <button
          onClick={handleDownloadPdf}
          className="mb-4 flex items-center gap-2 bg-green-200 text-green-900 px-4 py-2 rounded font-semibold hover:bg-green-300 transition"
        >
          Download as PDF
        </button>

        <div className="flex items-center justify-center mb-7">
          {idea.imageUrl ? (
            <img
              src={idea.imageUrl}
              alt={idea.title}
              className="w-48 h-48 object-cover object-center rounded-xl select-none pointer-events-none"
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
          ) : (
            <div
              className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 select-none"
              style={{
                width: "12rem",
                height: "12rem",
                fontWeight: 700,
                fontSize: "3.5rem",
                color: "#2b5040",
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderRadius: "1rem",
              }}
              aria-label="Placeholder image"
            >
              {idea.title?.[0] || "I"}
            </div>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 select-none">{idea.title}</h1>
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium select-none">
            {idea.author || "Anonymous"}
          </span>
          <span className="text-gray-400 text-xs select-none">{formatDate(idea.submittedAt)}</span>
        </div>

        <div className="mt-5">
          <h2 className="font-bold text-lg mb-2 text-green-700 select-none">Full Description</h2>
          {isSubscriber ? (
            <div
              className="text-gray-700 leading-relaxed text-base whitespace-pre-line select-none"
              style={{ pointerEvents: "auto" }}
            >
              {idea.description}
            </div>
          ) : (
            <div className="text-red-600 font-semibold bg-red-50 rounded-lg px-6 py-6 shadow text-base mb-8">
              You need to <span className="underline font-bold">subscribe</span> first to read the full description!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
