"use client";

import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Maincategory() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // should be http://localhost:5000
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Load list
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!mainCategory.trim() || !subCategory.trim()) {
      setMessage("Both fields are required.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);

    try {
      const url = editId
        ? `${API_URL}/api/categories/${editId}`
        : `${API_URL}/api/categories`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mainCategory, subCategory }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
        setIsSuccess(false);
      } else {
        setMessage(editId ? "Category updated successfully!" : "Category added successfully!");
        setIsSuccess(true);
        // reset
        setMainCategory("");
        setSubCategory("");
        setEditId(null);
        await fetchCategories();
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
      setIsSuccess(false);
    }

    setLoading(false);
  };

  // Edit load into form
  const handleEdit = (item) => {
    setMainCategory(item.mainCategory);
    setSubCategory(item.subCategory);
    setEditId(item._id);
    setMessage("");
    setIsSuccess(false);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure want to delete this category?")) return;

    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Delete failed.");
        setIsSuccess(false);
      } else {
        setMessage("Category deleted successfully!");
        setIsSuccess(true);
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-semibold uppercase mb-1">Add Category</h1>

      <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-1.5">
          <div className="w-full sm:w-full md:w-[30%]">
            <input
              type="text"
              placeholder="main category"
              className="w-full outline-none py-1 px-2.5 border"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-full md:w-[50%]">
            <input
              type="text"
              placeholder="sub category"
              className="w-full outline-none py-1 px-2.5 border"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-full md:w-[20%]">
            <button
              type="submit"
              className="w-full uppercase bg-[#941A06] py-1.5 text-white disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Processing..." : editId ? "Update" : "Add"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <p className={`mt-2 text-sm font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>

      {/* List */}
      <div className="w-full flex flex-col gap-1 mt-3">
        {categories.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No categories yet.</p>
        ) : (
          categories.map((item) => (
            <div key={item._id} className="w-full flex items-center justify-between gap-2.5 border px-2 py-1">
              <div className="flex items-center gap-5">
                <p className="text-sm font-bold capitalize">{item.mainCategory}</p>
                <p className="text-sm font-semibold capitalize">{item.subCategory}</p>
              </div>

              <div className="flex items-center gap-5 text-xl cursor-pointer">
                <FaRegEdit onClick={() => handleEdit(item)} />
                <RiDeleteBin5Fill onClick={() => handleDelete(item._id)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
