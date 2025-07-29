"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (name && email) {
      localStorage.setItem("subscriberName", name);
      localStorage.setItem("subscriberEmail", email);
      setTimeout(() => {
        router.replace("/home");
      }, 1200);
    } else {
      router.replace("/home");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-green-50 p-8 rounded-2xl shadow text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-3">
          Subscription Successful!
        </h2>
        <p className="text-gray-600">Redirecting...</p>
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
