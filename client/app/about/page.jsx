"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eafaf3] via-[#f9fdfa] to-[#e8f9f2] font-[Nunito] flex flex-col items-center py-12 px-2">
      <motion.div
        initial={{ opacity: 0, y: -36, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 justify-center">
          <img
            src="/images/logo.jpeg"
            alt="Idea's Bangladesh Logo"
            className="h-14 w-14 rounded-xl shadow-md"
          />
          <h1
            className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] bg-clip-text text-transparent tracking-wide"
            style={{ letterSpacing: 1.5 }}
          >
            Idea&apos;s Bangladesh
          </h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <p className="text-center text-gray-700 mt-4 text-lg md:text-xl font-semibold tracking-wide">
            Inspiring Innovation, Empowering Change
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.75 }}
        className="max-w-2xl bg-white rounded-3xl shadow-lg px-8 py-10 md:px-12 md:py-12 flex flex-col gap-7"
        style={{ backdropFilter: "blur(3px)" }}
      >
        {/* English Section */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-green-800 mb-2"
          >
            About Idea&apos;s Bangladesh
          </motion.h2>
          <p className="text-gray-800 mb-4 text-base md:text-lg leading-relaxed">
            Welcome to <span className="font-semibold">Idea’s Bangladesh</span>!<br />
            As a part of Soft Light, at Idea’s Bangladesh, we believe that powerful ideas can transform lives and shape the future of our nation. Our platform is dedicated to collecting, sharing, and celebrating innovative ideas that have the potential to solve real world problems in Bangladesh and beyond.<br /><br />
            We feature research-driven insights, thought-provoking articles, and creative solutions across fields like technology, education, agriculture, entrepreneurship, and sustainable development. Our goal is to inspire students, professionals, and changemakers to think differently, act boldly, and contribute to a better tomorrow.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div>
              <h3 className="font-bold text-green-700 text-lg mb-1">Our Mission</h3>
              <p className="text-gray-700">
                To create a vibrant hub for innovation and knowledge exchange, empowering people to turn ideas into actions that impact society positively.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-green-700 text-lg mb-1">Our Vision</h3>
              <p className="text-gray-700">
                A Bangladesh where every good idea finds a voice, and every voice can bring change.
              </p>
            </div>
          </div>
        </div>

        {/* Divider Animation */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
          className="h-0.5 bg-gradient-to-r from-green-200 via-green-100 to-green-300 rounded-full my-1"
        />

        {/* Bangla Section */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-[#15803d] mb-2"
          >
            আমাদের সম্পর্কে (About Idea’s Bangladesh)
          </motion.h2>
          <p className="text-gray-900 mb-4 text-[17px] md:text-lg leading-relaxed font-[Kalpurush, Nunito, sans-serif]">
            আইডিয়াজ বাংলাদেশে আপনাকে স্বাগতম!<br />
            আইডিয়াজ বাংলাদেশ বিশ্বাস করে—শক্তিশালী একটি আইডিয়া মানুষের জীবন পাল্টে দিতে পারে এবং আমাদের দেশের ভবিষ্যৎ গড়ে তুলতে পারে। এই প্ল্যাটফর্মটি বাংলাদেশের এবং বিশ্বের বাস্তব সমস্যার সমাধান করতে পারে এমন উদ্ভাবনী চিন্তাধারা সংগ্রহ, প্রকাশ ও উদযাপনের জন্য নিবেদিত।<br /><br />
            আমরা এখানে প্রকাশ করি গবেষণাভিত্তিক তথ্য, চিন্তাশীল লেখা এবং নানা ক্ষেত্রে সৃজনশীল সমাধান—প্রযুক্তি, শিক্ষা, কৃষি, উদ্যোক্তা উন্নয়ন ও টেকসই উন্নয়ন ইত্যাদি। আমাদের লক্ষ্য হচ্ছে ছাত্রছাত্রী, পেশাজীবী ও পরিবর্তনস্রষ্টাদের নতুনভাবে ভাবতে অনুপ্রাণিত করা, সাহসের সঙ্গে কাজ করা এবং একটি উন্নত আগামী গড়তে অবদান রাখতে উৎসাহিত করা।
          </p>
          <div className="grid md:grid-cols-2 gap-5 mt-6">
            <div>
              <h3 className="font-bold text-[#15803d] text-base mb-1">আমাদের মিশন</h3>
              <p className="text-gray-700">
                উদ্ভাবন ও জ্ঞান বিনিময়ের একটি প্রাণবন্ত কেন্দ্র তৈরি করা, যেখানে মানুষ তাদের আইডিয়াগুলোকে বাস্তবে রূপ দিতে উদ্বুদ্ধ হবে।
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#15803d] text-base mb-1">আমাদের ভিশন</h3>
              <p className="text-gray-700">
                একটি বাংলাদেশ, যেখানে প্রতিটি ভালো আইডিয়ার কণ্ঠস্বর আছে এবং প্রতিটি কণ্ঠস্বর পরিবর্তন আনতে সক্ষম।
              </p>
            </div>
          </div>
        </div>
        <div className="mt-7 text-center">
          <span className="text-green-800 font-semibold">
            Thank you for being part of our journey!<br />
            <span className="text-[#15803d]">আমাদের এই যাত্রায় আপনার সাথে থাকায় ধন্যবাদ!</span>
          </span>
        </div>
      </motion.section>

      {/* Go Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-10"
      >
        <Link
          href="/"
          className="inline-block px-7 py-3 bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] text-green-900 rounded-2xl font-bold text-lg shadow hover:opacity-95 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
