"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NewsletterComposePage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
     useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          router.push("/admin");
        }
      }, []);

    try {
      const res = await axios.post("http://localhost:5000/api/send-newsletter", {
        subject,
        content,
      });
      setResult({ success: true, message: `Newsletter sent to ${res.data.sent} subscribers!` });
      setSubject("");
      setContent("");
    } catch (err) {
      setResult({
        success: false,
        message:
          err.response?.data?.error ||
          "Failed to send newsletter. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-2xl relative">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/admin/dashboard")}
        className="absolute top-6 left-6 px-4 py-1 rounded-full bg-green-100 text-green-800 font-semibold hover:bg-green-200 shadow transition"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-8 text-green-800 text-center">Send Newsletter</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="font-semibold text-green-900 text-lg">
          Subject
          <input
            type="text"
            className="block w-full mt-2 p-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-base"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Newsletter Subject"
            disabled={sending}
          />
        </label>
        <label className="font-semibold text-green-900 text-lg">
          Message
          <textarea
            className="block w-full mt-2 p-4 rounded-xl border border-green-300 min-h-[340px] resize-vertical focus:outline-none focus:ring-2 focus:ring-green-400 text-base leading-7"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write your email message here..."
            disabled={sending}
          />
        </label>
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-green-700 shadow-md transition disabled:opacity-60"
          disabled={sending || !subject || !content}
        >
          {sending ? "Sending..." : "Send Newsletter"}
        </button>
        {result && (
          <div
            className={`mt-3 p-4 rounded-xl text-center text-base font-medium shadow ${
              result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
            }`}
          >
            {result.message}
          </div>
        )}
      </form>
    </div>
  );
}
