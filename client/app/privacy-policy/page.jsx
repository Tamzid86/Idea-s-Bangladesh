"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f8f4] via-[#fafdfa] to-[#e9f9f2] font-[Nunito] flex flex-col items-center py-12 px-2">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="mb-7"
      >
        <div className="flex items-center gap-3 justify-center">
          <img
            src="/logo.png"
            alt="Idea's Bangladesh Logo"
            className="h-12 w-12 rounded-xl shadow"
          />
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] bg-clip-text text-transparent tracking-wide">
            Privacy Policy
          </h1>
        </div>
        <p className="text-center text-gray-700 mt-2 text-lg md:text-xl font-semibold tracking-wide">
          Your Privacy Matters | গোপনীয়তার নীতি
        </p>
      </motion.div>

      {/* English Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.65 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl px-6 md:px-10 py-8 mb-10"
        style={{ backdropFilter: "blur(3px)" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
          Privacy Policy
        </h2>
        <p className="text-sm text-gray-600 mb-3">Effective Date: 29 July, 2025</p>
        <div className="text-gray-900 text-[16.5px] leading-relaxed space-y-4">
          <p>
            Your privacy is important to us. This Privacy Policy explains how Idea’s Bangladesh collects, uses, and protects your information when you visit our website.
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <span className="font-bold">Information We Collect</span><br />
              <span className="font-semibold">Personal Information:</span> When you sign up for membership, submit ideas or articles, or contact us, we may collect your name, email address, or other details you provide voluntarily.<br />
              <span className="font-semibold">NonPersonal Information:</span> We may collect browser type, IP address, pages visited, and other analytics data to improve website performance.
            </li>
            <li>
              <span className="font-bold">How We Use Your Information</span><br />
              To provide and improve our content, membership services, and community features.<br />
              To process and display user submissions (articles, ideas, comments).<br />
              To send newsletters, updates, or respond to inquiries.<br />
              To analyze website usage and enhance user experience.
            </li>
            <li>
              <span className="font-bold">Sharing of Information</span><br />
              We do not sell or rent your personal information. We may share anonymized or aggregated data with partners or service providers for analytics and improvement purposes.
            </li>
            <li>
              <span className="font-bold">Cookies</span><br />
              Our website may use cookies to enhance your experience. You can choose to disable cookies through your browser settings, but some features may not function properly.
            </li>
            <li>
              <span className="font-bold">Your Rights</span><br />
              You can request access to, correction of, or deletion of your personal information by contacting us at <span className="text-green-700">ideas.bangladesh01@gmail.com</span>
            </li>
          </ol>
        </div>
      </motion.section>

      {/* Animated Divider */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "88%", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        className="h-1 bg-gradient-to-r from-green-200 via-green-100 to-green-300 rounded-full mb-10"
      />

      {/* Bangla Section */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.7 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl px-6 md:px-10 py-8"
        style={{ backdropFilter: "blur(3px)" }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
          গোপনীয়তার নীতি
        </h2>
        <p className="text-sm text-gray-600 mb-3">কার্যকর হওয়ার তারিখ: ১৯ জুলাই, ২০২৫</p>
        <div className="text-gray-900 text-[16.5px] leading-relaxed font-[Kalpurush, Nunito, sans-serif] space-y-4">
          <p>
            আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। এই গোপনীয়তা নীতিতে ব্যাখ্যা করা হয়েছে যে, আপনি যখন আইডিয়াজ বাংলাদেশ ওয়েবসাইট ব্যবহার করেন তখন আমরা কিভাবে আপনার তথ্য সংগ্রহ করি, ব্যবহার করি এবং সুরক্ষিত রাখি।
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <span className="font-bold">আমরা কী ধরনের তথ্য সংগ্রহ করি</span><br />
              ব্যক্তিগত তথ্য: যখন আপনি সদস্যপদ গ্রহণ করেন, কোনো আইডিয়া বা লেখা পাঠান, বা আমাদের সাথে যোগাযোগ করেন, তখন আমরা আপনার নাম, ই-মেইল ঠিকানা বা আপনার দেওয়া অন্যান্য তথ্য সংগ্রহ করতে পারি।<br />
              অব্যক্তিগত তথ্য: আমরা ব্রাউজারের ধরন, আইপি ঠিকানা, ভিজিট করা পৃষ্ঠা এবং অন্যান্য অ্যানালিটিক্স তথ্য সংগ্রহ করতে পারি।
            </li>
            <li>
              <span className="font-bold">আমরা কীভাবে আপনার তথ্য ব্যবহার করি</span><br />
              আমাদের কন্টেন্ট, সদস্যপদ সেবা ও কমিউনিটি ফিচার উন্নত করতে।<br />
              ব্যবহারকারীর জমা দেওয়া লেখা বা আইডিয়া প্রক্রিয়া ও প্রকাশ করতে।<br />
              নিউজলেটার বা আপডেট পাঠাতে এবং আপনার প্রশ্নের উত্তর দিতে।<br />
              সাইট ব্যবহারের তথ্য বিশ্লেষণ করে ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে।
            </li>
            <li>
              <span className="font-bold">আমরা কীভাবে আপনার তথ্য রক্ষা করি</span><br />
              আমরা যুক্তিসঙ্গত নিরাপত্তা ব্যবস্থা ব্যবহার করি যাতে আপনার তথ্য সুরক্ষিত থাকে। তবে ইন্টারনেটে কোনো ডেটা ট্রান্সমিশন ১০০% নিরাপদ নয়, তাই আমরা পূর্ণাঙ্গ নিরাপত্তার নিশ্চয়তা দিতে পারি না।
            </li>
            <li>
              <span className="font-bold">তথ্য শেয়ারিং</span><br />
              আমরা আপনার ব্যক্তিগত তথ্য বিক্রি বা ভাড়া দিই না। আমরা কেবল অজ্ঞাত বা সমষ্টিগত তথ্য অংশীদার বা সেবা প্রদানকারীর সাথে শেয়ার করতে পারি।
            </li>
            <li>
              <span className="font-bold">কুকিজ</span><br />
              আমাদের ওয়েবসাইট কুকিজ ব্যবহার করতে পারে। আপনি চাইলে আপনার ব্রাউজারের মাধ্যমে কুকিজ বন্ধ করতে পারেন, তবে এতে কিছু ফিচার সঠিকভাবে কাজ নাও করতে পারে।
            </li>
            <li>
              <span className="font-bold">আপনার অধিকার</span><br />
              আপনি আমাদের সাথে <span className="text-green-700">ideas.bangladesh01@gmail.com</span> এ যোগাযোগ করে আপনার ব্যক্তিগত তথ্যের অ্যাক্সেস, সংশোধন বা মুছে ফেলার জন্য অনুরোধ করতে পারেন।
            </li>
          </ol>
        </div>
      </motion.section>

      {/* Go Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
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
