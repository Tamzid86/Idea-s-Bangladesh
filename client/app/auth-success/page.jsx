"use client";
import { Suspense } from "react";
import AuthSuccessContent from "./AuthSuccessContent";

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <AuthSuccessContent />
    </Suspense>
  );
}
