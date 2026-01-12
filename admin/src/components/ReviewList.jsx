"use client";

import { useEffect, useState } from "react";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch(`${API}/api/products/reviews/all`);
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    }

    loadReviews();
  }, []);

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-5 text-[#931905]">All Reviews</h1>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Product</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Message</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev._id} className="hover:bg-gray-50">
                  <td className="border p-2">{rev.product?.name || "N/A"} <br /> ID: {rev.product?._id || "N/A"}</td>
                  <td className="border p-2 capitalize">
                    {rev.user?.fullName ||
                      rev.user?.resellerName ||
                      "Anonymous"}
                  </td>
                  <td className="border p-2">{rev.rating} ⭐</td>
                  <td className="border p-2">{rev.message}</td>
                  <td className="border p-2">
                    {new Date(rev.createdAt).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
