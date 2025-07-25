"use client";
import React, { useState } from "react";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

export default function AdminBlogWritePage() {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  // Setup Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      Color,
      TextStyle,
    ],
    content: "",
  });

  const handleSave = async (status) => {
    if (!editor) return;
    setSaving(true);
    setResult(null);
    try {
      const endpoint = status === "draft" ? "/api/blogs/draft" : "/api/blogs/post";
      await axios.post(endpoint, {
        title,
        content: editor.getHTML(),
      });
      setResult({
        success: true,
        message: status === "draft" ? "Saved as draft!" : "Blog posted!",
      });
      setTitle("");
      editor.commands.setContent(""); // Clear editor
    } catch (err) {
      setResult({
        success: false,
        message: err.response?.data?.error || "Failed. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Toolbar
  const Toolbar = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        type="button"
        className={editor.isActive("bold") ? "font-bold text-green-800 px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </button>
      <button
        type="button"
        className={editor.isActive("italic") ? "italic text-green-800 px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </button>
      <button
        type="button"
        className={editor.isActive("underline") ? "underline text-green-800 px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        U
      </button>
      <button
        type="button"
        className={editor.isActive("strike") ? "line-through text-green-800 px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        S
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
      >
        1. List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
      >
        H2
      </button>
      <input
        type="color"
        className="w-8 h-8 border-none bg-transparent cursor-pointer"
        onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
        value={editor.getAttributes('textStyle').color || "#000000"}
        title="Text color"
      />
      <button
        type="button"
        onClick={() => {
          const url = prompt('Enter image URL');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className="px-2 py-1"
      >
        🖼️ Image
      </button>
      <button
        type="button"
        onClick={() => {
          const url = prompt('Enter link URL');
          if (url) editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
        }}
        className={editor.isActive("link") ? "px-2 py-1 bg-green-100 rounded" : "px-2 py-1"}
      >
        🔗 Link
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="px-2 py-1"
      >
        ✖ Clear
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-green-800 text-center">Write New Blog</h2>
      <div className="mb-5">
        <input
          type="text"
          className="block w-full p-3 rounded-xl border border-green-300 mb-2 text-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Blog Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={saving}
        />
      </div>
      {editor && <Toolbar />}
      <div className="mb-6 border rounded-xl p-2 bg-gray-50 min-h-[350px]">
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-6 justify-end">
        <button
          className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition"
          onClick={() => handleSave("draft")}
          disabled={saving || !title}
        >
          {saving ? "Saving..." : "Save as Draft"}
        </button>
        <button
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
          onClick={() => handleSave("post")}
          disabled={saving || !title || !editor?.getHTML().replace(/<(.|\n)*?>/g, '').trim()}
        >
          {saving ? "Posting..." : "Post Blog"}
        </button>
      </div>
      {result && (
        <div
          className={`mt-4 p-4 rounded-xl text-center text-lg font-medium shadow ${
            result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
}
