"use client";

import { useEffect, useState } from "react";
import CopyText from "@/src/components/CopyText";
import { FaHandPointRight } from "react-icons/fa";
import Link from "next/link";
import { GiShoppingBag } from "react-icons/gi";
import { RiShoppingBag3Fill } from "react-icons/ri";

export default function OrderConfirmation() {
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get orderId from URL (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("orderId"));
  }, []);

  // Fetch order from database via API
  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch order");

        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (!orderId) return <p className="text-center py-10">Invalid order ID</p>;
  if (loading) return <p className="text-center py-10">Loading order...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="w-full h-full universal">
      <div className="w-full sm:w-full md:w-[60%] px-5 h-full min-h-screen universal_column mt-16">
        <div className="w-full h-full min-h-screen py-10">
          <h1 className="text-2xl font-bold text-center text-[#931905] mb-3">
            Your order has been placed!
          </h1>

          <div className="bg-white border border-[#dddddd] p-4 rounded shadow-sm">
            <div className="w-full">
              <h1 className="text-xl font-medium text-[#2B2A29] flex items-start gap-2">
                <FaHandPointRight className="mt-1 text-red-600 w-5 min-w-5" />{" "}
                Please pay delivery fee to confirm your order. Use order ID as
                reference.
              </h1>

              <div className="border p-3 border-red-600 rounded-sm bg-amber-200 my-3">
                <h1 className="text-lg font-semibold capitalize">
                  We accept: <span>Bkash, Rocket, Nagad, Upay</span>
                </h1>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-lg font-semibold capitalize">
                    Send Money to:
                  </h2>
                  <CopyText text="01604168398" />
                </div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-semibold">
                    Use Order ID as reference:
                  </h2>
                  <CopyText text={order?.orderId || ""} />
                </div>
              </div>
            </div>

            <p className="text-lg font-semibold">Order ID: {order?.orderId}</p>
            <p className="text-sm text-gray-800 mb-2">
              Placed at:{" "}
              {order?.createdAt && new Date(order.createdAt).toLocaleString()}
            </p>

            {order?.billing && (
              <div className="mb-3">
                <h3 className="font-semibold">Billing Details</h3>
                <p>
                  <strong>Customer:</strong> {order.billing.fullName}
                </p>
                <p>
                  <strong>Address:</strong> {order.billing.address}
                </p>
                <p>
                  <strong>Thana:</strong> {order.billing.thana}
                </p>
                <p>
                  <strong>City:</strong> {order.billing.city}
                </p>
                <p>
                  <strong>District:</strong> {order.billing.district}
                </p>
                <p>
                  <strong>Phone:</strong> {order.billing.phone}
                </p>
                <p>
                  <strong>Email:</strong> {order.billing.email}
                </p>
                <p>
                  <strong>Comment:</strong> {order.billing.comment}
                </p>
                <p>
                  <strong>Points:</strong> {order.points}
                </p>
              </div>
            )}

            {order?.items && (
              <div className="mb-3">
                <h3 className="font-semibold">Items</h3>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left border border-[#dddddd] p-2">
                        Product
                      </th>
                      <th className="text-right border border-[#dddddd] p-2">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((it) => (
                      <tr key={it.productId}>
                        <td className="border border-[#dddddd] p-2">
                          {it.name} x {it.quantity}
                        </td>
                        <td className="text-right border border-[#dddddd] p-2">
                          <span className="taka">৳- </span>
                          {Number(it.price * it.quantity).toLocaleString(
                            "en-IN",
                          )}
                          /=
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {order && (
              <div className="mb-3">
                <p className="capitalize">
                  Shipping Method: <strong>{order.shippingMethod}</strong>
                </p>
                <p>
                  Shipping Charge:{" "}
                  <strong>
                    {" "}
                    <span className="taka">৳- </span>
                    {order.shippingCharge}/=
                  </strong>
                </p>
                <p>
                  Payment Method: <strong>{order.paymentMethod}</strong>
                </p>
              </div>
            )}

            {order && (
              <div className="border-t pt-3 w-full flex items-center justify-between gap-1.5">
                <h3 className="font-bold">Totals :</h3>
                <p>
                  <span className="taka">
                    ৳- {Number(order.grandTotal).toLocaleString("en-IN")}/=
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="w-full py-5 flex items-center justify-between flex-wrap">
            <Link href="/" className="buy_btn">
              <span>Shop More</span>
              <span className="text-sm shop_btn_icon">
                <GiShoppingBag />
              </span>
            </Link>
            <Link href="/profile" className="buy_btn">
              <span>View Orders</span>
              <span className="text-sm shop_btn_icon">
                <RiShoppingBag3Fill />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
