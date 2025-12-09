"use client";

import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";
import Image from "next/image";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const handleStatusChange = async ( newStatus) => {
    try {
      setUpdatingOrder();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update order");

      await fetchOrders();
    } catch (err) {
      console.error("Update order error:", err);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete order");

      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error("Delete order error:", err);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-center py-10 text-gray-500">No orders found.</p>;
  }

  return (
    <div className="w-full p-5 universal_column">
      <h1 className="text-2xl font-bold text-[#931905] mb-5">All Orders</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Product ID</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Color</th>
              <th className="p-2 border">Shipping Method</th>
              <th className="p-2 border">Payment Method</th>
              <th className="p-2 border">Points</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.items.map((item, idx) => (
                <tr key={`${order._id}-${idx}`} className="hover:bg-gray-50">
                  <td className="p-2 border">{order.orderId}</td>
                  <td className="p-2 border">{item.productId}</td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">
                    {item.image && (
                      <Image src={item.image} alt={item.name} width={50} height={50} className="object-cover rounded" />
                    )}
                  </td>
                  <td className="p-2 border">{order.billing.fullName}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.color || "-"}</td>
                  <td className="p-2 border">{order.shippingMethod}</td>
                  <td className="p-2 border">{order.paymentMethod}</td>
                  <td className="p-2 border flex items-center gap-1">
                    {order.points} <IoMdStar className="text-yellow-500" />
                  </td>
                  <td className="p-2 border">৳ {item.price * item.quantity}</td>
                  <td className="p-2 border">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border rounded px-1 py-0.5"
                      disabled={updatingOrder === order._id}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-2 border flex gap-2 items-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
