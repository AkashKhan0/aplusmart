"use client";

import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Faq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);

  const [editId, setEditId] = useState(null); // for edit mode
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch FAQ list
  const fetchFaqs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/faq`);
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Add or Update FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!question.trim() || !answer.trim()) {
      setIsSuccess(false);
      setMessage("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const url = editId
        ? `${API_URL}/api/faq/${editId}`
        : `${API_URL}/api/faq`;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsSuccess(false);
        setMessage(data.error || "Something went wrong.");
      } else {
        setIsSuccess(true);
        setMessage(
          editId ? "FAQ updated successfully!" : "FAQ added successfully!"
        );
        setQuestion("");
        setAnswer("");
        setEditId(null);
        fetchFaqs();
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Server error.");
    }

    setLoading(false);
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`${API_URL}/api/faq/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("FAQ deleted successfully!");
        setIsSuccess(true);
        fetchFaqs();
      } else {
        setMessage(data.error || "Delete failed.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Server error.");
      setIsSuccess(false);
    }
  };

  // Edit FAQ → load into input boxes
  const handleEdit = (item) => {
    setQuestion(item.question);
    setAnswer(item.answer);
    setEditId(item._id);
    setMessage(""); // reset
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-semibold mb-1">ADD FAQ</h1>

      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col sm:flex-row gap-1.5"
        >
          <div className="w-full sm:w-[40%]">
            <input
              type="text"
              className="w-full outline-none py-1 px-2.5 border"
              placeholder="add question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-[50%]">
            <textarea
              placeholder="write answer"
              className="w-full outline-none py-1 px-2.5 border"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
          </div>

          <div className="w-full sm:w-[10%]">
            <button
              type="submit"
              className="w-full uppercase bg-[#941A06] py-1.5 text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : editId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      {/* Error / Success Message */}
      {message && (
        <p
          className={`mt-2 text-sm font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* FAQ LIST */}
      <div className="w-full flex flex-col gap-1 mt-3">
        {faqs.length === 0 && (
          <p className="text-center text-sm text-gray-500">No FAQ added yet.</p>
        )}

        {faqs.map((item) => (
          <div
            key={item._id}
            className="w-full flex items-center justify-between gap-2.5 border p-2"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold">{item.question}</p>
              <p className="text-sm">{item.answer}</p>
            </div>

            <div className="flex items-center gap-5 text-xl cursor-pointer">
              <FaRegEdit onClick={() => handleEdit(item)} />
              <RiDeleteBin5Fill onClick={() => handleDelete(item._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
