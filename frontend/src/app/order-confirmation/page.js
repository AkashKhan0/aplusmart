"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CopyText from "@/src/components/CopyText";
import { FaHandPointRight } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("latest_order");
      if (!raw) {
        setOrder(null);
        return;
      }
      setOrder(JSON.parse(raw));
    } catch (err) {
      console.error("read order error:", err);
      setOrder(null);
    }
  }, []);

  return (
    <div className="w-full h-full universal">
      <div className="w-full sm:w-full md:w-[60%] px-5 h-full min-h-screen universal_column">
        <div className="w-full h-full min-h-screen py-10">
          <h1 className="text-2xl font-bold text-center text-[#931905] mb-3">
            Your order has been placed!
          </h1>

          <div className="bg-white border border-[#dddddd] p-4 rounded shadow-sm">
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-semibold">Order ID:</h2>
              <CopyText text={order.orderId} />
            </div>

            <p className="text-sm text-gray-800">
              Placed at: {new Date(order.createdAt).toLocaleString()}
            </p>

            <p className="flex items-center gap-1.5 text-sm text-gray-800 mb-2">
              Points : <span className="flex items-center text-[#931905] font-semibold">{order.points}<IoMdStar /></span>
            </p>

            {/* <span className="flex items-center text-[#931905]">({order.points}<IoMdStar />)</span> */}

            <div className="mb-3">
              <h3 className="font-semibold">Billing Details</h3>
              <p>
                <strong>Customer : </strong>
                {order.billing.fullName}
              </p>
              <p>
                <strong>Address : </strong>
                {order.billing.address}, <strong>Thana : </strong>
                {order.billing.thana}, <strong>City : </strong>
                {order.billing.city}
              </p>
              <p>
                <strong>District : </strong>
                {order.billing.district}
              </p>
              <p>
                <strong>Phone : </strong>
                {order.billing.phone}
              </p>
              <p>
                <strong>Email : </strong>
                {order.billing.email}
              </p>
              <p>
                <strong>Comment : </strong>
                {order.billing.comment}
              </p>
            </div>

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
                  {order.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="border border-[#dddddd] p-2">
                        {it.name} x {it.quantity}
                      </td>
                      <td className="text-right border border-[#dddddd] p-2">
                        <span className="taka">৳ -</span>{" "}
                        {it.price * it.quantity} /-
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-3">
              <p>
                Shipping Method: <strong>{order.shippingMethod}</strong>
              </p>
              <p>
                Shipping Charge:{" "}
                <strong>
                  {" "}
                  <span className="taka">৳ -</span> {order.shippingCharge}
                </strong>
              </p>
              <p>
                Payment Method: <strong>{order.paymentMethod}</strong>
              </p>
            </div>

            <div className="border-t pt-3 w-full flex items-center justify-between gap-1.5">
              <h3 className="font-bold">Totals</h3>
              <p>
                <span className="font-bold">
                  <span className="taka">৳ -</span> {order.grandTotal} /-
                </span>
              </p>
            </div>

            <div className="w-full">
              <h1 className="text-xl font-medium text-[#2B2A29] my-5 flex items-start gap-2">
                <FaHandPointRight className="mt-1 text-red-600 w-5 h-5 min-w-5" /> Please pay
                delivery fee for confirm your order. Use order ID in your
                reference.
              </h1>
              <h1 className="text-lg font-semibold capitalize">we accept : <span>Bkash, </span><span>Rocket, </span><span>Nagad, </span> <span>Upay</span> </h1>
              <div className="flex items-center gap-1.5">
              <h2 className="text-lg font-semibold capitalize">Send Money:</h2>
              <CopyText text="01604168398" />
            </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2 items-center justify-between">
            <Link href="/">
              <button className="bg-[#931905] py-2 px-5 rounded text-white text-base font-semibold cursor-pointer">
                Back to shop
              </button>
            </Link>
            <Link href="/profile">
              <button className="buy_btn">View Orders</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
