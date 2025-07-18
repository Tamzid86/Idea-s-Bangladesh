"use client";
export default function Pagination({ page, totalPages, onPageChange }) {
    return (
      <div className="flex gap-2 items-center justify-center mt-4">
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-green-50 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span className="text-sm font-medium">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded border bg-white hover:bg-green-50 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    );
  }
  