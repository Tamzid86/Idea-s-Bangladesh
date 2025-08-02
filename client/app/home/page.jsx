"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/page";
import SubscribeButton from "../../components/SubscribeButton/page"
import Footer from "../../components/Footer/page";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${apiUrl}/ads`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAds(res.data);
        }
      } catch (err) {
        console.error("Ad fetch failed", err);
      }
    };
    fetchAds();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5faf7] via-white to-[#f5faf7] font-[Nunito]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#EDF4EE] py-16 md:py-30 px-4 md:px-0">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] font-black text-gray-800 mb-5 w-full text-center leading-tight"
            style={{
              letterSpacing: "1px",

            }}
          >
            Welcome to <span className="bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] bg-clip-text text-transparent">Idea&apos;s Bangladesh</span>
          </motion.h1>
          <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto mb-8 px-4">
            Discover, share, and explore innovative ideas that shape our future. Join our community of thinkers and dreamers from Bangladesh and beyond.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 px-4">
            <motion.a
              whileHover={{ scale: 1.06 }}
              href="/from-the-book"
              className="btn-shimmer bg-gradient-to-r from-[#91C5A9] to-[#74eecb] px-6 py-3 md:px-5 md:py-2 rounded-2xl text-black font-semibold shadow-lg border border-green-200 transition-all duration-300 w-full sm:w-auto"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <span className="relative z-10">English Ideas</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.06 }}
              href="/Bangla-blogs"
              className="btn-shimmer border-2 border-green-400 px-6 py-3 md:px-5 md:py-2 rounded-2xl text-green-700 font-semibold bg-white/80 shadow-lg transition-all duration-300 w-full sm:w-auto"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <span className="relative z-10">Bangla Ideas</span>
            </motion.a>

          </div>
        </div>
      </section>

      {/* Explore Ideas Section */}
      <section className="py-16 bg-gradient-to-b from-[#f8fcf9] to-[#f2fbf6]">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Explore Ideas</h2>
        <p className="text-center text-gray-600 mb-12">
          Three pathways to discover and contribute to our idea ecosystem
        </p>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg border-t-4 border-green-100"
          >
            <div className="bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">From the Book</h3>
            <p className="text-gray-600 mb-4">Curated ideas and insights from published works and research</p>

            <Link href="/from-the-book">
              <button
                className="bg-gradient-to-r from-green-200 via-green-100 to-green-300
             px-7 py-2 rounded-2xl text-green-700 font-semibold shadow-md
             border border-green-300 transition-all duration-200
             hover:from-green-100 hover:to-green-400
             hover:shadow-green-300/30"
              >
                Explore Ideas
              </button>

            </Link>

          </motion.div>
          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-green-50 rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg border-t-4 border-green-200"
          >
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 12l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Reader’s Innovations</h3>
            <p className="text-gray-600 mb-4">Showcasing the brilliance within our community.</p>
            <Link href="/idea">
              <button
                className="bg-green-300 px-7 py-2 rounded-2xl text-green-900 font-semibold shadow
             border border-green-400 transition-all duration-200
             hover:bg-green-400 hover:text-green-950 hover:shadow-green-200/70"
              >
                View Creativity
              </button>

            </Link>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-lg border-t-4 border-green-100"
            id="submit-idea"
          >
            <div className="bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>

            <h3 className="font-semibold text-lg mb-2">Submit Your Idea</h3>


            <p className="text-gray-600 mb-4">Share your innovative thoughts with our growing community</p>
            <Link href={"/idea-submission"}>
              <button
                className="bg-gradient-to-r from-green-200 via-green-100 to-green-300
             px-7 py-2 rounded-2xl text-green-700 font-semibold shadow-md
             border border-green-300 transition-all duration-200
             hover:from-green-100 hover:to-green-400
             hover:shadow-green-300/30"
              >
                Submit Now
              </button>

            </Link>

          </motion.div>
        </div>
      </section>
      {/* Where Ideas Take Flight Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-0 pt-20 pb-14">
        {/* Header and Icon */}
        <div className="text-center mb-10 flex flex-col items-center">
          {/* Animated Gradient Circle Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex items-center justify-center mb-3"
          >
            <span
              className="rounded-full flex items-center justify-center"
              style={{
                width: "clamp(80px, 15vw, 110px)",
                height: "clamp(80px, 15vw, 110px)",
                border: "3px solid",
                borderImage: "linear-gradient(135deg, #a9ebc4, #bef5ce 90%) 1",
              }}
            >
              <svg width="clamp(50, 12vw, 70)" height="clamp(50, 12vw, 70)" fill="none" viewBox="0 0 60 60">
                <circle
                  cx="30"
                  cy="30"
                  r="26"
                  stroke="url(#lightbulb-stroke)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M30 20a8 8 0 0 0-8 8c0 3.08 2.39 5.85 4.5 7.11V38a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-2.89c2.11-1.26 4.5-4.03 4.5-7.11a8 8 0 0 0-8-8z"
                  stroke="url(#lightbulb-stroke)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <line
                  x1="26"
                  y1="45"
                  x2="34"
                  y2="45"
                  stroke="#95c9ac"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="lightbulb-stroke" x1="12" y1="12" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#95c9ac" />
                    <stop offset="1" stopColor="#b8f5cd" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.div>
          {/* Animated Gradient Text */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold mb-2 text-center px-4"
            style={{
              background: "linear-gradient(90deg, #7eaa92 10%, #a7f6ad 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
            }}
          >
            Where Ideas Take Flight
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-gray-600 mb-14 text-base md:text-lg max-w-2xl mx-auto px-4"
          >
            Where inspiration is cultivated, creativity is unleashed and every spark of imagination finds its home.
          </motion.p>
        </div>
        {/* Segment Cards with animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* 1 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.035, boxShadow: "0 4px 32px #95c9ac18" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center bg-[#f5faf7] hover:ring-2 hover:ring-[#9bcbb2]/50 transition rounded-2xl p-6 md:p-7 w-full group shadow-sm"
            style={{ minHeight: 170 }}
          >
            <span className="bg-[#e1fcef] rounded-full p-4 mb-4">
              <svg width={40} height={40} fill="none" viewBox="0 0 24 24">
                <path d="M12 6v6l4 2" stroke="#95C9AC" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="font-extrabold text-base md:text-lg text-gray-800 group-hover:text-[#56b884] transition">
              Innovation
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-2 text-center">
              Sparking creativity through thoughtful ideas
            </div>
          </motion.div>
          {/* 2 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.035, boxShadow: "0 4px 32px #95c9ac18" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.19 }}
            className="flex flex-col items-center bg-[#f5faf7] hover:ring-2 hover:ring-[#9bcbb2]/50 transition rounded-2xl p-6 md:p-7 w-full group shadow-sm"
            style={{ minHeight: 170 }}
          >
            <span className="bg-[#e1fcef] rounded-full p-4 mb-4">
              <svg width={40} height={40} fill="none" viewBox="0 0 24 24">
                <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="#95C9AC" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="font-extrabold text-base md:text-lg text-gray-800 group-hover:text-[#56b884] transition">
              Community
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-2 text-center">
              Building connections between brilliant minds
            </div>
          </motion.div>
          {/* 3 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.035, boxShadow: "0 4px 32px #95c9ac18" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-col items-center bg-[#f5faf7] hover:ring-2 hover:ring-[#9bcbb2]/50 transition rounded-2xl p-6 md:p-7 w-full group shadow-sm"
            style={{ minHeight: 170 }}
          >
            <span className="bg-[#e1fcef] rounded-full p-4 mb-4">
              <svg width={40} height={40} fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#95C9AC" strokeWidth={2.1} />
                <path d="M12 2v20m10-10H2" stroke="#95C9AC" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="font-extrabold text-base md:text-lg text-gray-800 group-hover:text-[#56b884] transition">
              Impact
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-2 text-center">
              Creating meaningful change through collaboration
            </div>
          </motion.div>
          {/* 4 */}
          <motion.div
            whileHover={{ y: -6, scale: 1.035, boxShadow: "0 4px 32px #95c9ac18" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.37 }}
            className="flex flex-col items-center bg-[#f5faf7] hover:ring-2 hover:ring-[#9bcbb2]/50 transition rounded-2xl p-6 md:p-7 w-full group shadow-sm"
            style={{ minHeight: 170 }}
          >
            <span className="bg-[#e1fcef] rounded-full p-4 mb-4">
              <svg width={40} height={40} fill="none" viewBox="0 0 24 24">
                <rect x="5" y="4" width="14" height="16" rx="2" stroke="#95C9AC" strokeWidth={2.1} />
                <path d="M5 8h14" stroke="#95C9AC" strokeWidth={2.1} strokeLinecap="round" />
              </svg>
            </span>
            <div className="font-extrabold text-base md:text-lg text-gray-800 group-hover:text-[#56b884] transition">
              Knowledge
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-2 text-center">
              Sharing wisdom to inspire future generations
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-14 px-4 bg-[#f8fcf9] border-t border-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-3">Need Expert Advice or Support?</h3>
          <p className="text-gray-700 text-base md:text-lg mb-5 px-2">
            Whether you want to bring your business idea to life or need guidance from experienced minds —
            we're here to support you.
          </p>
          <a
            href="mailto:ideasbangladesh2025@gmail.com"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#91C5A9] to-[#74eecb] text-black rounded-full font-semibold hover:opacity-90 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
      {ads.length > 0 && (
        <section className="py-16 bg-white px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-10">Sponsored By </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {ads.map((ad, index) => (
                <div
                  key={ad._id || index}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition border border-green-100 flex flex-col w-full max-w-xs"
                >
                  {/* Show ad image if present */}
                  {ad.imageUrl && (
                    <img
                      src={ad.imageUrl}
                      alt={ad.title || "Ad"}
                      className="w-full h-52 object-cover"
                      style={{ background: "#e6faef" }}
                    />
                  )}
                  <div className="p-5 flex flex-col h-full justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-green-700 mb-2">{ad.title}</h4>
                      <p className="text-gray-600 text-sm">{ad.description}</p>
                    </div>
                    {ad.link && (
                      <a
                        href={ad.link.startsWith("http") ? ad.link : `https://${ad.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-green-600 font-semibold hover:underline"
                      >
                        Visit Site →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Stay Updated Section */}
      <section className="py-16 bg-gradient-to-b from-[#f5faf7] via-[#f8fcf9] to-[#f5faf7] px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
          <h3 className="text-lg md:text-xl font-bold mb-2">Stay Updated</h3>
          <p className="text-gray-600 text-sm md:text-base mb-6 px-2">
            Subscribe to get full access to all ideas and join our community of innovators
          </p>
          <div className="flex gap-2 items-center justify-center">
            <SubscribeButton />
          </div>
          <div className="text-xs md:text-sm text-gray-400 mt-2">
            Get exclusive access to premium content.
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
}
