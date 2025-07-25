"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsOfServicePage() {
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
            src="/images/logo.jpeg"
            alt="Idea's Bangladesh Logo"
            className="h-12 w-12 rounded-xl shadow"
          />
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#7eaa92] to-[#a7f6ad] bg-clip-text text-transparent tracking-wide">
            Terms of Service
          </h1>
        </div>
        <p className="text-center text-gray-700 mt-2 text-lg md:text-xl font-semibold tracking-wide">
          পরিষেবার শর্তাবলি
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
          Terms of Service
        </h2>
        <p className="text-sm text-gray-600 mb-3">Effective Date: 29 July, 2025</p>
        <div className="text-gray-900 text-[16.5px] leading-relaxed space-y-4">
          <p>
            Welcome to Idea’s Bangladesh. By accessing or using our website, you agree to comply with and be bound by the following Terms of Service.
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <span className="font-bold">Acceptance of Terms</span><br />
              By using this website, submitting ideas, or becoming a member, you agree to these terms and all applicable laws. If you do not agree, please discontinue use.
            </li>
            <li>
              <span className="font-bold">Use of Content</span><br />
              All articles, images, and materials on this site are owned by or licensed to Idea’s Bangladesh.<br />
              You may share content for personal or educational purposes with proper attribution.<br />
              You may not reproduce, republish, or commercially exploit our content without prior written consent.
            </li>
            <li>
              <span className="font-bold">User Submissions</span><br />
              <span className="font-semibold">Ownership:</span> By submitting content (ideas, articles, comments) to Idea’s Bangladesh, you grant us a nonexclusive, royaltyfree license to publish, display, and distribute that content on our platform.<br />
              <span className="font-semibold">Responsibility:</span> You are solely responsible for ensuring your submission does not infringe on thirdparty rights, contain unlawful material, or violate any applicable laws.<br />
              <span className="font-semibold">Disclaimer:</span> We reserve the right to edit, reject, or remove user submissions at our discretion.
            </li>
            <li>
              <span className="font-bold">Membership</span><br />
              <span className="font-semibold">Eligibility:</span> Membership is available to individuals who provide accurate information and comply with these terms.<br />
              <span className="font-semibold">Account Security:</span> You are responsible for maintaining the confidentiality of your account credentials.<br />
              <span className="font-semibold">Termination:</span> We reserve the right to suspend or terminate memberships that violate our policies or misuse our platform.
            </li>
            <li>
              <span className="font-bold">User Conduct</span><br />
              When interacting on our website:<br />
              Do not upload or share offensive, unlawful, or harmful content.<br />
              Respect other users’ opinions and privacy.
            </li>
            <li>
              <span className="font-bold">External Links</span><br />
              Our site may include links to thirdparty websites. We are not responsible for the content, accuracy, or practices of these external sites.
            </li>
            <li>
              <span className="font-bold">Limitation of Liability</span><br />
              Idea’s Bangladesh is not liable for any loss, damage, or inconvenience arising from your use of this site, reliance on its content, or participation in membership services.
            </li>
            <li>
              <span className="font-bold">Changes to Terms</span><br />
              We may update these Terms of Service at any time. Continued use of the site after changes are posted means you accept those changes.
            </li>
            <li>
              <span className="font-bold">Contact</span><br />
              For questions about these terms, please contact us at <span className="text-green-700">ideas.bangladesh01@gmail.com</span>.
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
          পরিষেবার শর্তাবলি
        </h2>
        <p className="text-sm text-gray-600 mb-3">কার্যকর হওয়ার তারিখ: ২৯ জুলাই, ২০২৫</p>
        <div className="text-gray-900 text-[16.5px] leading-relaxed font-[Kalpurush, Nunito, sans-serif] space-y-4">
          <p>
            আইডিয়াজ বাংলাদেশ ওয়েবসাইটে আপনাকে স্বাগতম। আমাদের সাইট ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলির সাথে একমত হচ্ছেন।
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <span className="font-bold">শর্তাবলি গ্রহণ</span><br />
              এই ওয়েবসাইট ব্যবহার করা, কোনো লেখা বা আইডিয়া জমা দেওয়া, অথবা সদস্যপদ গ্রহণ করার মাধ্যমে আপনি এই শর্তাবলি ও সমস্ত প্রযোজ্য আইনের সাথে একমত হচ্ছেন। আপনি যদি একমত না হন, তবে সাইট ব্যবহার বন্ধ করুন।
            </li>
            <li>
              <span className="font-bold">কনটেন্ট ব্যবহার</span><br />
              এই সাইটের সমস্ত লেখা, ছবি ও উপকরণ আইডিয়াজ বাংলাদেশ-এর মালিকানাধীন বা লাইসেন্সপ্রাপ্ত।<br />
              ব্যক্তিগত বা শিক্ষামূলক উদ্দেশ্যে যথাযথ কৃতিত্ব দিয়ে কনটেন্ট শেয়ার করতে পারেন।<br />
              আমাদের অনুমতি ছাড়া কনটেন্ট পুনঃপ্রকাশ বা বাণিজ্যিক কাজে ব্যবহার করা যাবে না।
            </li>
            <li>
              <span className="font-bold">ব্যবহারকারীর জমা দেওয়া কনটেন্ট</span><br />
              <span className="font-semibold">স্বত্বাধিকার:</span> আপনি যখন কোনো লেখা, আইডিয়া বা মন্তব্য জমা দেন, তখন আপনি আমাদেরকে সেটি প্রকাশ, প্রদর্শন ও বিতরণের একটি অ-একচেটিয়া, রয়্যালটি-মুক্ত লাইসেন্স প্রদান করেন।<br />
              <span className="font-semibold">দায়িত্ব:</span> আপনার জমা দেওয়া কনটেন্ট কোনো তৃতীয় পক্ষের অধিকার লঙ্ঘন করবে না বা বেআইনি উপাদান থাকবে না—এটি নিশ্চিত করার দায়িত্ব আপনার।<br />
              <span className="font-semibold">অস্বীকৃতি:</span> আমরা প্রয়োজনে আপনার জমা দেওয়া কনটেন্ট সম্পাদনা, প্রত্যাখ্যান বা মুছে দেওয়ার অধিকার রাখি।
            </li>
            <li>
              <span className="font-bold">সদস্যপদ</span><br />
              <span className="font-semibold">যোগ্যতা:</span> যারা সঠিক তথ্য প্রদান করবেন এবং এই শর্তাবলি মানবেন, তাদের জন্য সদস্যপদ উন্মুক্ত।<br />
              <span className="font-semibold">অ্যাকাউন্ট নিরাপত্তা:</span> আপনার অ্যাকাউন্টের তথ্যের গোপনীয়তা রক্ষা করা আপনার দায়িত্ব।<br />
              <span className="font-semibold">সদস্যপদ বাতিল:</span> আমাদের নীতি লঙ্ঘন করলে বা সাইটের অপব্যবহার করলে আমরা সদস্যপদ স্থগিত বা বাতিল করার অধিকার রাখি।
            </li>
            <li>
              <span className="font-bold">ব্যবহারকারীর আচরণ</span><br />
              আমাদের সাইটে ব্যবহার করার সময়:<br />
              কোনো আক্রমণাত্মক, বেআইনি বা ক্ষতিকারক কনটেন্ট শেয়ার করবেন না।<br />
              অন্য ব্যবহারকারীর মতামত ও গোপনীয়তাকে সম্মান করবেন।
            </li>
            <li>
              <span className="font-bold">বাহ্যিক লিঙ্ক</span><br />
              আমাদের সাইটে অন্য ওয়েবসাইটের লিঙ্ক থাকতে পারে। আমরা সেই সাইটগুলোর কনটেন্ট বা নীতির জন্য দায়ী নই।
            </li>
            <li>
              <span className="font-bold">দায়বদ্ধতার সীমা</span><br />
              আইডিয়াজ বাংলাদেশ কোনো ক্ষতি, অসুবিধা বা ক্ষতির জন্য দায়ী থাকবে না যা এই সাইট ব্যবহার করার ফলে ঘটতে পারে।
            </li>
            <li>
              <span className="font-bold">শর্তাবলি পরিবর্তন</span><br />
              আমরা যেকোনো সময় এই শর্তাবলি পরিবর্তন করতে পারি। পরিবর্তিত শর্তাবলির পরে সাইট ব্যবহার চালিয়ে গেলে তা গ্রহণ করা হয়েছে বলে গণ্য হবে।
            </li>
            <li>
              <span className="font-bold">যোগাযোগ</span><br />
              এই শর্তাবলি সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন: <span className="text-green-700">ideas.bangladesh01@gmail.com</span>
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
