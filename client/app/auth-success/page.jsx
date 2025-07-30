"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Processing subscription...");

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    console.log("Auth success - Name:", name, "Email:", email); // Debug log

    if (name && email) {
      // Decode the URL-encoded parameters
      const decodedName = decodeURIComponent(name);
      const decodedEmail = decodeURIComponent(email);

      localStorage.setItem("subscriberName", decodedName);
      localStorage.setItem("subscriberEmail", decodedEmail);

      setMessage(`Welcome ${decodedName.split(" ")[0]}! Subscription successful!`);

      setTimeout(() => {
        router.push("/"); // Use push instead of replace, and go to home page
      }, 2000);
    } else {
      setMessage("Subscription failed. Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5faf7] via-white to-[#f5faf7]">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-green-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-3">Subscription Successful!</h2>
        <p className="text-gray-600">{message}</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccessContent />
    </Suspense>
  );
}
