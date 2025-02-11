import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchQuery from "../hooks/useFetchData";

const BlogCreatePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { response: newPostRes, error: newPostErr, isLoading, refetch: createPost } = useFetchQuery('/post/create', 'POST', { headers: { 'Content-Type': 'application/json' } });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !content) {
      toast.info("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);

    // call api
    createPost(formData);
  };

  useEffect(() => {
    if (newPostRes) {
      toast.success(newPostRes.message);
      navigate('/posts', { replace: true });
    } else if (newPostErr) {
      toast.error(newPostErr);
    }
  }, [newPostRes, newPostErr])

  if (isLoading) return <h1 className='flex items-center justify-center'>Creating Post...</h1>

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Blog Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-gray-700 font-medium">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Travel">Travel</option>
            <option value="Othwe">Other</option>
          </select>
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-gray-700 font-medium">Content:</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="mt-2 bg-white"
            theme="snow"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default BlogCreatePage;
