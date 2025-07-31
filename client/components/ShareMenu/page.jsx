"use client";
import React, { useState, useEffect, useRef } from "react";
import { Facebook, Linkedin, Twitter, Share2, Copy, Check, MessageCircle, X } from "lucide-react";

export default function ShareMenu({ title, url, onSubscribeRequired }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
      const subscriberEmail =
      typeof window !== "undefined" && localStorage.getItem("subscriberEmail");
    const subscriberName =
      typeof window !== "undefined" && localStorage.getItem("subscriberName");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 return (
  <div className="relative flex items-center" ref={dropdownRef}>
    {/* Share Button */}
    <button
      onClick={() => {
        if (!subscriberEmail || !subscriberName) {
          onSubscribeRequired(); 
          return;
        }
        setOpen((prev) => !prev);
      }}
      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded hover:bg-green-50 transition text-sm"
    >
      <Share2 size={18} />
      Share
    </button>

    {/* Horizontal Expand Menu */}
    {open && (
      <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-full px-3 py-1 ml-3 z-50">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Facebook size={16} />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white"
        >
          <Twitter size={16} />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white"
        >
          <Linkedin size={16} />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
        >
          <MessageCircle size={16} />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
        </button>
      </div>
    )}
  </div>
);

}
