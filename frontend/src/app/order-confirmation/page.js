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
  const [activeBank, setActiveBank] = useState(0);

  // hardcoded bank details (since they rarely change, no need to fetch from API)
  const bankList = [
    {
      name: "Dhaka Bank",
      accNo: "1082010003940",
      accType: "CASA",
      holder: "RUBAYET NAZIM SHOUD",
      phone: "01604168398",
      district: "Dhaka",
      branch: "Mirpur",
    },
    {
      name: "Agroni Bank PLC",
      accNo: "0200023218946",
      accType: "Savings Account",
      holder: "RUBAYET NAZIM SHOUD",
      phone: "01604168398",
      district: "Dhaka",
      branch: "Shewrapara BR 7264",
    },
    {
      name: "Duch Bangla Bank",
      accNo: "7017317975920",
      accType: "",
      holder: "MD. FAHAD NUR AKASH",
      phone: "01323386130",
      district: "Tangail",
      branch: "Tangail",
    },
    {
      name: "Islami Bank Bangladesh LTD",
      accNo: "20507770225393144",
      accType: "MSA",
      holder: "MD FAHAD NUR AKASH",
      phone: "01600041610",
      district: "Tangail",
      branch: "Tangail",
    },
  ];

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

  if (loading)
    return (
      <div className="universal w-full h-full min-h-screen font-semibold">
        Loading order...
      </div>
    );
  if (error)
    return (
      <div className="universal w-full h-full min-h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  if (!orderId)
    return (
      <div className="universal w-full h-full min-h-screen font-semibold">
        Invalid order ID
      </div>
    );

  return (
    <div className="w-full h-full min-h-screen universal">
      <div className="w-full sm:w-full md:w-[60%] px-5 h-full min-h-screen universal_column mt-16">
        <div className="w-full h-full min-h-screen py-10">
          <h1 className="text-2xl font-bold text-center text-[#931905] mb-3">
            Your order has been placed!
          </h1>

          <div className="bg-white border border-[#dddddd] p-4 rounded shadow-sm">
            <div className="w-full">
              {order?.paymentMethod === "Cash on Delivery" && (
                <div className="flex items-start gap-2">
                  <FaHandPointRight className="mt-1 text-red-600 w-5 min-w-5" />{" "}
                  <h1 className="text-xl font-medium text-[#2B2A29]">
                    Please pay the delivery fee of{" "}
                    {Number(order.shippingCharge).toLocaleString("en-IN")} taka
                    to confirm your order.{" "}
                    <strong>
                      Kindly use your <strong>Order ID</strong> as the payment
                      reference.
                    </strong>
                  </h1>
                </div>
              )}
              {order?.paymentMethod === "Online Payment" && (
                <div className="flex items-start gap-2">
                  <FaHandPointRight className="mt-1 text-red-600 w-5 min-w-5" />{" "}
                  <h1 className="text-xl font-medium text-[#2B2A29]">
                    Clear your Online Payment{" "}
                    {Number(order.grandTotal).toLocaleString("en-IN")}/= taka.{" "}
                    <strong>Use order ID as reference.</strong>
                  </h1>{" "}
                </div>
              )}

              <div className="w-full mt-2">
                <h1 className="font-semibold capitalize text-xl">
                  <strong>We Accept</strong>
                </h1>
              </div>

              <div className="px-3 py-1 rounded-sm bg-amber-200 my-2">
                <h1 className="text-lg font-semibold capitalize">
                  Send Money to:
                </h1>
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-base font-semibold capitalize">
                    Bkash : <CopyText text="01604168398" />
                  </h2>
                  <h2 className="text-base font-semibold capitalize">
                    Rocket : <CopyText text="017790956903" />
                  </h2>
                  <h2 className="text-base font-semibold capitalize">
                    Nagad : <CopyText text="01779095690" />
                  </h2>
                  <h2 className="text-base font-semibold capitalize">
                    Upay : <CopyText text="01779095690" />
                  </h2>
                </div>

                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-semibold">
                    <strong>
                      Use Order ID as reference :{" "}
                      <CopyText text={order?.orderId || ""} />
                    </strong>
                  </h2>
                </div>
              </div>

              {/* bank details */}
              <div className="px-3 py-2 rounded-sm bg-amber-200 my-2">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* LEFT — Bank List */}
                  <div className="w-full md:w-[40%] flex flex-col gap-1.5">
                    {bankList.map((bank, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveBank(index)}
                        className={`text-left px-2 py-1 rounded-sm text-base font-medium transition cursor-pointer ${
                          activeBank === index
                            ? "bg-red-600 text-white"
                            : "bg-white hover:bg-red-100"
                        }`}
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>

                  {/* RIGHT — Bank Details */}
                  <div className="w-full md:w-[60%] bg-white p-2 rounded-sm text-base">
                    <p>
                      <strong>Acc No:</strong> <CopyText text={bankList[activeBank].accNo} />
                    </p>

                    {bankList[activeBank].accType && (
                      <p>
                        <strong>Acc Type:</strong>{" "}
                        {bankList[activeBank].accType}
                      </p>
                    )}

                    <p>
                      <strong>Name:</strong> {bankList[activeBank].holder}
                    </p>
                    <p>
                      <strong>Phone:</strong> {bankList[activeBank].phone}
                    </p>
                    <p>
                      <strong>District:</strong> {bankList[activeBank].district}
                    </p>
                    <p>
                      <strong>Branch:</strong> {bankList[activeBank].branch}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-lg font-semibold">Order ID: {order?.orderId}</p>
            <p className="text-base text-gray-800">
              Placed at:{" "}
              {order?.createdAt && new Date(order.createdAt).toLocaleString()}
            </p>

            {order?.billing && (
              <div className="mb-3">
                <h3 className="font-semibold text-xl mt-2">
                  {" "}
                  <strong>Billing Details</strong>{" "}
                </h3>
                <p>
                  <strong>Customer:</strong> {order.billing.fullName}
                </p>
                <p>
                  <strong>Full Address:</strong> {order.billing.address}
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
                {order?.user?.role === "customer" && (
                  <p>
                    <strong>Points:</strong> {order.points}
                  </p>
                )}
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
                    {Number(order.shippingCharge).toLocaleString("en-IN")}/=
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
