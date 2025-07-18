"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/page";
 import SubscribeButton from "../../components/SubscribeButton/page"
import Footer from "../../components/Footer/page";

const featuredIdeas = [
  {
    id: 1,
    title: "Digital Innovation in Rural Bangladesh",
    summary: "Exploring how technology can bridge the gap between urban and rural communities, creating opportunities for sustainable development...",
    image: "/images/t.png", 
    category: "Technology",
    time: "5 min read",
    btn: "Read More"
  },
  {
    id: 2,
    title: "Sustainable Agriculture Solutions",
    summary: "Revolutionary farming techniques that can help Bangladesh achieve food security while protecting the environment...",
    image: "/images/t.png",
    category: "Environment",
    time: "7 min read",
    btn: "Read More"
  },
  {
    id: 3,
    title: "Youth Entrepreneurship Movement",
    summary: "How young entrepreneurs are transforming the business landscape in Bangladesh with innovative startups and social enterprises...",
    image: "/images/t.png",
    category: "Business",
    time: "6 min read",
    btn: "Read More"
  },
];

export default function HomePage() {




  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5faf7] via-white to-[#f5faf7] font-[Nunito]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
<section className="bg-[#EDF4EE] py-30 px-4 md:px-0">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-[70px] font-black text-gray-800 mb-5 w-full whitespace-nowrap overflow-x-auto text-center"
      style={{
        letterSpacing: "2px",     
        
      }}
    >
      Welcome to <span className="bg-gradient-to-r from-[#95C9AC] to-[#C5F8C8] bg-clip-text text-transparent">Idea&apos;s Bangladesh</span>
    </motion.h1>
    <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8">
      Discover, share, and explore innovative ideas that shape our future. Join our community of thinkers and dreamers from Bangladesh and beyond.
    </p>
    <div className="flex justify-center gap-4 mt-6">
      <motion.a
        whileHover={{ scale: 1.04 }}
        href="/from-the-book"
        className="bg-[#91C5A9] px-5 py-2 rounded text-black font-medium shadow hover:bg-green-400 transition"
      >
        Start Reading
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.04 }}
        href="/idea-submission"
        className="border-2 border-green-400 px-5 py-2 rounded text-green-600 font-medium bg-white hover:bg-green-50 transition"
      >
        Submit Your Idea
      </motion.a>
    </div>
  </div>
</section>


      {/* Featured Ideas */}
      <section id="featured-ideas" className="max-w-7xl mx-auto px-4 md:px-0 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">Featured Ideas</h2>
        <p className="text-center text-gray-600 mb-12">
          Discover the most impactful ideas shaping Bangladesh&apos;s future
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {featuredIdeas.map((idea, idx) => (
            <motion.div
              key={idea.id}
              className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg group transition hover:shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className={`absolute left-4 top-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm`}>
                  {idea.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{idea.title}</h3>
                <span className="block text-gray-500 text-xs mb-2">{idea.time}</span>
                <p className="text-gray-700 text-sm mb-5">{idea.summary}</p>
                <a
                  href="#"
                  className="block text-center border border-green-300 text-green-700 px-4 py-2 rounded hover:bg-green-50 transition font-medium"
                >
                  {idea.btn}
                </a>
              </div>
            </motion.div>
          ))}
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
              <button className="bg-green-200 px-6 py-1 rounded text-green-700 font-medium hover:bg-green-300 transition">
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
            <h3 className="font-semibold text-lg mb-2">Popular Ideas</h3>
            <p className="text-gray-600 mb-4">Trending concepts from our community and featured selections</p>
            <Link href="/popular-ideas">
              <button className="bg-green-200 px-6 py-1 rounded text-green-700 font-medium hover:bg-green-300 transition">
                View Popular
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
                <button className="bg-green-200 px-6 py-1 rounded text-green-700 font-medium hover:bg-green-300 transition">
              Submit Now
            </button>
            </Link>
        
          </motion.div>
        </div>
      </section>

      {/* Stay Updated Section */}
      <section className="py-16 bg-gradient-to-b from-[#f5faf7] via-[#f8fcf9] to-[#f5faf7]">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get full access to all ideas and join our community of innovators
          </p>
          <form className="flex gap-2 items-center justify-center">
            
            <SubscribeButton />
          </form>
          <div className="text-s text-gray-400 mt-2">
           Get exclusive access to premium content.
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
