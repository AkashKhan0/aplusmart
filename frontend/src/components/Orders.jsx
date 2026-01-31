"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Orders({ onOrdersFetch }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/my`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
          if (onOrdersFetch) onOrdersFetch(data); // send to parent
        } else {
          setOrders([]);
          if (onOrdersFetch) onOrdersFetch([]);
        }
      })
      .catch(() => {
        setOrders([]);
        if (onOrdersFetch) onOrdersFetch([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-6">Loading orders...</p>;
  if (orders.length === 0)
    return (
      <div className="w-full h-full universal">
        <div className="fixed_width px-5 h-full universal_column py-10">
          <Image
            src="/images/empty-cart.svg"
            alt="A Plus Mart BD"
            width={300}
            height={300}
            className="object-contain max-w-[300px]"
          />
          <p className="text-xl font-bold text-[#931905] capitalize">Empty!</p>
        </div>
      </div>
    );

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden hidden md:table">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Order Item</th>
              <th className="px-4 py-2 text-left">Order Status</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-t-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 font-medium">
                  {order.items.map((item, index) => (
                    <div key={index} className="mb-2">
                      {/* Product Name */}
                      <p className="text-sm font-medium">
                        {item.name} x {item.quantity}
                      </p>

                      {/* Colors */}
                      <div className="flex gap-1">
                        {item.colors && item.colors.length > 0 ? (
                          item.colors.map((color, i) => (
                            <span
                              key={i}
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">
                            No color selected
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 capitalize">
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs capitalize ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2 text-right font-semibold">
                  <span className="taka">৳- </span>
                  {Number(order.grandTotal).toLocaleString("en-IN")}/=
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 📱 Mobile View (Card Style) */}
        <div className="md:hidden space-y-2">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-3 shadow-sm bg-white"
            >
              <p className="text-sm">
                <span className="font-semibold">Order Item:</span>
                {order.items.map((item, index) => (
                  <span key={item.productId}>
                    {item.name}
                    {index !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <div className="flex justify-between mt-2 text-sm">
                <span>Order Status:</span>
                <span className="font-medium capitalize">{order.status}</span>
              </div>

              <div className="flex justify-between mt-1 text-sm">
                <span>Payment Status:</span>
                <span
                  className={`font-medium capitalize ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between mt-2 border-t border-t-gray-300 pt-2">
                <span className="font-semibold">Total </span>
                <span className="taka">
                  ৳- {Number(order.grandTotal).toLocaleString("en-IN")}/=
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
