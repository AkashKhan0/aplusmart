"use client";

import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import Image from "next/image";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all orders (admin)
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        credentials: "include", // send adminToken cookie
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Delete order
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Update status or payment
  const handleUpdate = async (id, field, value) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}/${field}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            [field === "status" ? "status" : "paymentStatus"]: value,
          }),
          credentials: "include",
        }
      );
      // Update local state
      setOrders(
        orders.map((order) =>
          order._id === id
            ? {
                ...order,
                [field === "status" ? "status" : "paymentStatus"]: value,
              }
            : order
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Filter orders by search
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        const orderIdMatch = order.orderId
          ?.toLowerCase()
          .includes(search.toLowerCase());
        const customerMatch =
          order.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          order.user?.resellerName
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const productMatch = order.items.some((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        return orderIdMatch || customerMatch || productMatch;
      })
    : [];

  return (
    <div className="w-full universal_column">
      <h1 className="text-2xl font-bold text-[#931905] ">All Orders</h1>

      <div className="w-full max-w-[60%] border my-5 flex items-stretch">
        <input
          type="search"
          placeholder="Search by Order ID, Customer or Product"
          className="w-full py-1 px-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-3 border bg-[#666] text-white uppercase"
          onClick={() => {}}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Product Details</th>
                <th className="p-2 border">Method</th>
                <th className="p-2 border">Billing Details</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    No orders found
                  </td>
                </tr>
              )}
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    <Image
                      src={order.items[0]?.image || "/"}
                      alt={order.items[0]?.name || "image"}
                      width={50}
                      height={50}
                      className="object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border">
                    <p className="capitalize">
                      Customer:{" "}
                      {order.user?.role === "customer"
                        ? order.user?.fullName
                        : order.user?.resellerName}
                    </p>
                    <p>Order ID: {order.orderId}</p>
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        <p>Product ID: {item.productId}</p>
                        <div className="w-full flex items-center gap-5">
                          <p>Quantity: {item.quantity}</p>

                          <div className="w-fit border">
                            <div className="flex gap-1">
                              {item.colors?.map((color, idx) => (
                                <span
                                  key={idx}
                                  className="w-3 h-3 rounded-full border border-black"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border">
                    <p className="capitalize">
                      Shipping: {order.shippingMethod}
                    </p>
                    <p>Payment: {order.paymentMethod}</p>
                    <p>
                      Total: <span className="taka_font taka">৳- </span>
                      {Number(order.grandTotal).toLocaleString("en-IN")}/={" "}
                    </p>
                  </td>
                  <td className="p-2 border text-start">
                    <p>Name: {order.billing.fullName}</p>
                    <p>Address: {order.billing.address}</p>
                    <p>City: {order.billing.city}</p>
                    <p>Thana: {order.billing.thana} , Dist: {order.billing.district}</p>
                    <p>Phone: {order.billing.phone}</p>
                    <p>Comment: {order.billing.comment}</p>
                  </td>
                  <td className="p-2 border text-center">
                    <select
                      className="border outline-none rounded mb-2 px-1 py-0.5"
                      value={order.paymentStatus}
                      onChange={(e) =>
                        handleUpdate(order._id, "payment", e.target.value)
                      }
                    >
                      <option value="notyet">Not Yet! ❌</option>
                      <option value="delivery_fee">Delivery Fee ⛟</option>
                      <option value="paid">Paid ✔</option>
                    </select>
                    <br />
                    <select
                      className="border outline-none rounded px-1 py-0.5"
                      value={order.status}
                      onChange={(e) =>
                        handleUpdate(order._id, "status", e.target.value)
                      }
                    >
                      <option value="pending">Pending ⴵ</option>
                      <option value="processing">Processing ⚙</option>
                      <option value="shipped">Shipped ⛟</option>
                      <option value="delivered">Delivered 📦</option>
                      <option value="cancelled">Cancelled ⊘</option>
                    </select>
                  </td>
                  <td className="p-2 border text-xl">
                    <button
                      className="text-red-600 hover:text-red-800 mr-2"
                      onClick={() => handleDelete(order._id)}
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-800"
                      onClick={() => fetchOrders()}
                    >
                      <IoReload />
                    </button>
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
