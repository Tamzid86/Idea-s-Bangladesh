"use client";
export default function SubscribePrompt() {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center flex flex-col items-center">
        <div className="text-lg font-semibold mb-3">
          You need to subscribe to read the full article!
        </div>
        <button
          onClick={() => {
            // Redirect to your subscribe page or open modal
            window.location.href = "/subscribe"; // change as needed
          }}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 mt-2"
        >
          Subscribe Now
        </button>
      </div>
    );
  }
  