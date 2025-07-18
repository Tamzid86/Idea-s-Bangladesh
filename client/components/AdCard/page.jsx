"use client";
export default function AdCard({ ad }) {
    return (
      <div className={`rounded-xl p-4 shadow bg-gradient-to-br from-white to-green-50 border border-green-100`}>
        <div className="font-bold">{ad.title}</div>
        <div className="text-sm text-gray-600 mb-2">{ad.description}</div>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-100 px-3 py-2 rounded shadow hover:bg-green-200 text-green-900 font-medium"
        >
          {ad.cta || "Learn More"} <span aria-hidden>↗</span>
        </a>
      </div>
    );
  }
  