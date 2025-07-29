"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SubscribeButton() {
   const [subscriberName, setSubscriberName] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("subscriberName");
      if (name) {
        setSubscriberName(name.split(" ")[0]);
      }
    }
  }, []);
  return (
    <div>
    {subscriberName ? (
        <div className="font-bold text-green-700">
          Welcome, {subscriberName}!
        </div>
      ) :(
        <Link href={`${apiUrl}/google`}>
            <motion.button
              whileHover={{
                scale: 1.07,
                boxShadow: "0 8px 24px 0 rgba(34, 197, 94, 0.18)"
              }}
              className="bg-gradient-to-r from-[#91C5A9] via-[#7EE8A7] to-[#74eecb] 
                        text-black px-7 py-2 rounded-2xl font-semibold shadow-lg 
                        transition-all duration-200 hover:from-[#74eecb] hover:to-[#91C5A9] 
                        hover:shadow-green-200/40 border border-green-200"
            >
              Subscribe
          </motion.button>
          </Link>
      )}

    </div>
  );
}