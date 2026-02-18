"use client";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/my`, {
          credentials: "include",
        });
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Fetch transactions error:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      {/* Empty State */}
{transactions.length === 0 && (
  <p className="text-center text-gray-500 py-6">
    No transactions yet.
  </p>
)}

{/* Desktop Table */}
{transactions.length > 0 && (
  <div className="w-full overflow-x-auto">
    <table className="min-w-full border border-gray-200 overflow-hidden hidden md:table">
      <thead className="bg-gray-200 text-gray-700 text-sm">
        <tr>
          <th className="px-4 py-2 text-left">Order ID</th>
          <th className="px-4 py-2 text-left">Payment Method</th>
          <th className="px-4 py-2 text-right">Total Amount</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((order) => (
          <tr
            key={order._id}
            className="border-t border-t-gray-200 hover:bg-gray-50 transition"
          >
            <td className="px-4 py-2 font-medium">
              {order.orderId}
            </td>

            <td className="px-4 py-2">
              <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700 capitalize">
                {order.paymentMethod}
              </span>
            </td>

            <td className="px-4 py-2 text-right font-semibold">
            <span className="taka">৳- </span>{Number(order.grandTotal).toLocaleString("en-IN")}/=
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* 📱 Mobile Card View */}
    <div className="md:hidden space-y-3 mt-2">
      {transactions.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg p-3 shadow-sm bg-white"
        >
          <p className="text-sm">
            <span className="font-semibold">Order ID:</span>{" "}
            {order.orderId}
          </p>

          <div className="flex justify-between mt-2 text-sm">
            <span>Payment Method</span>
            <span className="font-medium capitalize">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between mt-2 border-t border-t-gray-300 pt-2">
            <span className="font-semibold">Total</span>
            <span className="font-bold">
          <span className="taka">৳- {Number(order.grandTotal).toLocaleString("en-IN")}/=</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}
