"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (name && email) {
      localStorage.setItem("subscriberName", decodeURIComponent(name));
      localStorage.setItem("subscriberEmail", decodeURIComponent(email));
      setTimeout(() => router.push("/"), 2000);
    } else {
      setTimeout(() => router.push("/"), 1500);
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-green-50 p-8 rounded-2xl shadow text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-3">
          Subscription Successful!
        </h2>
        <p className="text-gray-600">Redirecting...</p>
        <div className="mt-4 animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
      </div>
    </div>
  );
}
