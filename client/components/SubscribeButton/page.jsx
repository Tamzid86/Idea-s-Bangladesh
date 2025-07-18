"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SubscribeButton() {
   const [subscriberName, setSubscriberName] = useState(null);

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
          Hello, {subscriberName}!
        </div>
      ) :(
        <Link href="http://localhost:5000/api/google">
            <motion.button
              whileHover={{ scale: 1.07 }}
              className="bg-[#91C5A9] text-black px-5 py-1 rounded transition font-medium hover:bg-green-400"
            >
              Subscribe
            </motion.button>
          </Link>
      )}

    </div>
  );
}