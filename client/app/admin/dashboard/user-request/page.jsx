"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { X, Check, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HandleRequestsPage() {
  const router = useRouter();
  const [pendingIdeas, setPendingIdeas] = useState([]);
  const [approvedIdeas, setApprovedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedLoading, setApprovedLoading] = useState(true);

  // Modal state
  const [modalIdea, setModalIdea] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
    }
  }, []);

  // Fetch pending ideas
  const fetchPendingIdeas = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/pending-ideas");
      setPendingIdeas(res.data);
    } catch {
      setPendingIdeas([]);
    }
    setLoading(false);
  };

  // Fetch approved ideas
  const fetchApprovedIdeas = async () => {
    setApprovedLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/approved-ideas");
      setApprovedIdeas(res.data);
    } catch {
      setApprovedIdeas([]);
    }
    setApprovedLoading(false);
  };

  useEffect(() => {
    fetchPendingIdeas();
    fetchApprovedIdeas();
  }, []);

  // Approve idea
  const handleApprove = async (id) => {
    if (!window.confirm("Approve this idea?")) return;
    try {
      await axios.patch(`http://localhost:5000/api/approve-idea/${id}`);
      setPendingIdeas(pendingIdeas.filter((idea) => idea._id !== id));
      fetchApprovedIdeas(); // update the approved list
    } catch {
      alert("Failed to approve idea.");
    }
  };

  // Reject idea
  const handleReject = async (id) => {
    if (!window.confirm("Reject this idea?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/reject-idea/${id}`);
      setPendingIdeas(pendingIdeas.filter((idea) => idea._id !== id));
    } catch {
      alert("Failed to reject idea.");
    }
  };

  // Delete approved idea
  const handleDeleteApproved = async (id) => {
    if (!window.confirm("Delete this approved idea?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/delete-idea/${id}`);
      setApprovedIdeas(approvedIdeas.filter((idea) => idea._id !== id));
    } catch {
      alert("Failed to delete approved idea.");
    }
  };

  // Modal close on background click or X
  const closeModal = () => setModalIdea(null);

  return (
    <div className={`min-h-screen bg-[#f5faf7] font-[Nunito] px-4 py-10 relative ${modalIdea ? "overflow-hidden" : ""}`}>
      {/* Header */}
      <div className="flex items-center gap-4 max-w-4xl mx-auto mb-8">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="flex items-center gap-1 text-green-700 hover:text-green-900 font-semibold px-3 py-2 rounded transition hover:bg-green-100"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-extrabold text-green-700 flex-1">
          Handle User Requests
        </h1>
      </div>

      {/* Pending Ideas Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border p-4 overflow-x-auto mb-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">Pending Ideas</h2>
        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading...</div>
        ) : pendingIdeas.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No pending ideas.</div>
        ) : (
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="border-b text-gray-700 font-bold">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Author</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingIdeas.map((idea) => (
                <tr
                  key={idea._id}
                  className="border-b hover:bg-green-50 transition group cursor-pointer"
                  onClick={() => setModalIdea({ ...idea, status: "Pending" })}
                >
                  <td className="py-3 px-4 align-middle font-semibold">{idea.title}</td>
                  <td className="py-3 px-4 align-middle">
                    <div className="max-w-[220px] truncate">{idea.description}</div>
                  </td>
                  <td className="py-3 px-4 align-middle">
                    {idea.imageUrl ? (
                      <img
                        src={idea.imageUrl}
                        alt="idea"
                        className="w-16 h-10 object-cover rounded mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4 align-middle">{idea.author || "N/A"}</td>
                  <td className="py-3 px-4 align-middle" onClick={e => e.stopPropagation()}>
                    <div className="flex gap-2 justify-center items-center">
                      <button
                        onClick={() => handleApprove(idea._id)}
                        className="text-green-600 hover:bg-green-100 p-2 rounded"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleReject(idea._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Approved Ideas Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border p-4 overflow-x-auto">
        <h2 className="text-xl font-bold text-green-700 mb-4">Approved Ideas</h2>
        {approvedLoading ? (
          <div className="text-center text-gray-500 py-20">Loading...</div>
        ) : approvedIdeas.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No approved ideas.</div>
        ) : (
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="border-b text-gray-700 font-bold">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Author</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedIdeas.map((idea) => (
                <tr
                  key={idea._id}
                  className="border-b hover:bg-green-50 transition group cursor-pointer"
                  onClick={() => setModalIdea({ ...idea, status: "Approved" })}
                >
                  <td className="py-3 px-4 align-middle font-semibold">{idea.title}</td>
                  <td className="py-3 px-4 align-middle">{idea.author || "N/A"}</td>
                  <td className="py-3 px-4 align-middle" onClick={e => e.stopPropagation()}>
                    <div className="flex gap-2 justify-center items-center">
                      <button
                        onClick={() => handleDeleteApproved(idea._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                        title="Delete"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL for Idea Details */}
      {modalIdea && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backdropFilter: "blur(6px)", background: "rgba(40,80,60,0.15)" }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full relative border border-green-100"
            style={{ animation: "fadeIn .15s" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={closeModal}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <div className="mb-4">
              <span className={`text-xs font-bold px-2 py-1 rounded ${modalIdea.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"}`}>
                {modalIdea.status}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{modalIdea.title}</h2>
            <div className="mb-2 text-sm text-gray-500">
              {modalIdea.author || modalIdea.authorName || "Anonymous"}
            </div>
            {modalIdea.imageUrl && (
              <div className="mb-4 flex items-center justify-center">
                <img
                  src={modalIdea.imageUrl}
                  alt="idea"
                  className="rounded-xl w-48 h-36 object-cover border"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold mb-1 text-green-700">Full Description:</h3>
              <div className="text-gray-800 whitespace-pre-line max-h-64 overflow-y-auto">
                {modalIdea.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
