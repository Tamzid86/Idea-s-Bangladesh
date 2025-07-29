"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateBlogPage() {
    const router = useRouter();
    const fileInput = useRef();
    const [categories, setCategories] = useState([]);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
    const [form, setForm] = useState({
        title: "",
        summary: "",
        description: "",
        read_time: "",
        image: null,
        category: "",
        type: "English",
    });
     useEffect(() => {
            const token = localStorage.getItem("adminToken");
            if (!token) {
            router.push("/admin");
            }
        }, []);
    

    useEffect(() => {
        axios
            .get(`${apiUrl}/category`)
            .then((res) => setCategories(res.data))
            .catch(() => setCategories([]));
    }, []);

    const handleInputChange = (e) => {
        if (e.target.name === "image") {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreating(true);
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("summary", form.summary);
        formData.append("description", form.description);
        formData.append("read_time", form.read_time);
        if (form.image) formData.append("image", form.image);
        formData.append("category", form.category);
        formData.append("type", form.type);

        try {
            await axios.post(`${apiUrl}/create-blog`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSuccess("Blog created successfully!");
            setTimeout(() => router.push("/admin/dashboard"), 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create blog.");
        } finally {
            setCreating(false);
        }
    };
    

    return (
        <div className="min-h-screen bg-[#F5FAF7] pb-20 font-[Nunito] px-8">
            <div className="max-w-5xl mx-auto py-10">
                <h1 className="text-3xl font-extrabold text-green-700 mb-6">
                    Create a New Blog
                </h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="bg-white shadow-lg rounded-2xl p-8"
                >
                    <div className="mb-4">
                        <label className="font-semibold">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={form.title}
                            onChange={handleInputChange}
                            className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Summary</label>
                        <input
                            type="text"
                            name="summary"
                            required
                            value={form.summary}
                            onChange={handleInputChange}
                            className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Description</label>
                        <Editor
                            apiKey="savl4o4p433ju0hjmyzv5vjqb5u5fw3wrw4s6nhozac5253z"
                            value={form.description}
                            init={{
                                plugins: "image table lists link code",
                                toolbar:
                                    "undo redo | bold italic underline | forecolor backcolor | alignleft aligncenter alignright | bullist numlist | table image link code",
                                automatic_uploads: true,
                                images_upload_url:
                                    `${apiUrl}/upload-inline-image`,
                                paste_data_images: true, 
                            }}
                            onEditorChange={(content) =>
                                setForm({ ...form, description: content })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Main Blog Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            ref={fileInput}
                            onChange={handleInputChange}
                            className="w-full mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Read Time</label>
                        <input
                            type="text"
                            name="read_time"
                            required
                            value={form.read_time}
                            onChange={handleInputChange}
                            className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                            placeholder="e.g. 5 min read"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Category</label>
                        <select
                            name="category"
                            required
                            value={form.category}
                            onChange={handleInputChange}
                            className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Blog Type</label>
                        <select
                            name="type"
                            required
                            value={form.type}
                            onChange={handleInputChange}
                            className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring focus:ring-green-100"
                        >
                            <option value="English">English</option>
                            <option value="Bangla">Bangla</option>
                        </select>
                    </div>
                    {error && <div className="mb-3 text-red-500 text-sm">{error}</div>}
                    {success && <div className="mb-3 text-green-700 text-sm">{success}</div>}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 transition"
                            disabled={creating}
                        >
                            {creating ? "Creating..." : "Create Blog"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/admin/dashboard")}
                            className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-semibold hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
