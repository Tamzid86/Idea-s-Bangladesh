"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import Footer from "../../components/Footer/page";

const popularIdeas = [
  {
    image: "images/t.png",
    trending: true,
    category: "Energy",
    readTime: "7 min read",
    title: "Community-Based Renewable Energy Solutions",
    author: "Admin",
    likes: 142,
    summary:
      "A grassroots approach to solving Bangladesh’s energy crisis through solar cooperatives...",
  },
  {
    image: "images/t.png",
    trending: true,
    category: "Transportation",
    readTime: "6 min read",
    title: "Smart Rickshaw Network for Urban Transportation",
    author: "Rashida Khatun",
    likes: 98,
    summary:
      "Revolutionizing Dhaka’s transportation with app-based electric rickshaws...",
  },
  {
    image: "images/t.png",
    trending: false,
    category: "Agriculture",
    readTime: "5 min read",
    title: "Vertical Farming in Urban Slums",
    author: "Mohammad Karim",
    likes: 87,
    summary:
      "Transforming rooftops and small spaces into productive gardens...",
  },
  // Add more as needed...
];

const ads = [
  {
    title: "Learn Programming",
    desc: "Master coding skills with our comprehensive courses",
    btn: "Start Learning",
  },
  {
    title: "Digital Marketing Course",
    desc: "Grow your business with proven marketing strategies",
    btn: "Enroll Now",
  },
  {
    title: "Freelancing Success",
    desc: "Build a successful freelance career from home",
    btn: "Get Started",
  },
];

export default function PopularIdeasPage() {
  return (
    <div className="min-h-screen bg-[#f9fdfa] font-[Nunito]">
      {/* Top Header */}
      <div className="bg-[#EDF7F3] py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <a
            href="/home"
            className="flex items-center gap-2 text-green-700 font-medium mb-2 hover:underline text-sm"
          >
            <span className="text-xl">&#8592;</span> Back to Home
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
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Popular Ideas
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Trending concepts from our community and featured selections that are making a real impact in Bangladesh.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row gap-8 pt-10">
        {/* Ideas Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {popularIdeas.map((idea, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow border border-green-100 flex flex-col hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="relative">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="w-full h-48 object-cover object-center"
                  />
                
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                      {idea.category}
                    </span>
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
                      {idea.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-1">{idea.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>By {idea.author}</span>
                    <span className="flex items-center gap-1 text-pink-500">
                      <Heart size={15} className="inline" /> {idea.likes}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{idea.summary}</p>
                  <button className="bg-green-200 text-green-900 px-5 py-2 rounded font-semibold hover:bg-green-300 transition flex items-center gap-2 text-sm w-full mt-auto">
                    Read More
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Ads Section */}
        <div className="w-full lg:w-[340px] flex flex-col gap-6 mt-2">
          <div className="mb-2 font-semibold text-gray-700 text-lg">Sponsored</div>
          {ads.map((ad, i) => (
            <div key={i} className="bg-white rounded-xl shadow border overflow-hidden">
              <div className="relative">
                {/* <img src={ad.image} alt={ad.title} className="w-full h-36 object-cover" /> */}
                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                  Ad
                </span>
              </div>
              <div className="p-4">
                <div className="font-semibold mb-1">{ad.title}</div>
                <div className="text-gray-500 text-sm mb-3">{ad.desc}</div>
                <button className="bg-green-200 text-green-900 px-5 py-2 rounded font-semibold hover:bg-green-300 transition w-full flex items-center justify-center gap-2 text-sm">
                  {ad.btn}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
