"use client";

import { useState, useEffect } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/src/context/AppContext";

const districts = [
  "Dhaka",
  "Gazipur",
  "Narayanganj",
  "Narsingdi",
  "Manikganj",
  "Munshiganj",
  "Faridpur",
  "Rajbari",
  "Madaripur",
  "Shariatpur",
  "Tangail",
  "Kishoreganj",
  "Gopalganj",
  "Chattogram",
  "Cox's Bazar",
  "Rangamati",
  "Bandarban",
  "Khagrachari",
  "Feni",
  "Noakhali",
  "Lakshmipur",
  "Cumilla",
  "Brahmanbaria",
  "Chandpur",
  "Rajshahi",
  "Natore",
  "Naogaon",
  "Pabna",
  "Sirajgonj",
  "Bogura",
  "Joypurhat",
  "Chapainawabganj",
  "Khulna",
  "Jessore",
  "Satkhira",
  "Jhenaidah",
  "Magura",
  "Narail",
  "Kushtia",
  "Chuadanga",
  "Meherpur",
  "Bagerhat",
  "Barishal",
  "Bhola",
  "Patuakhali",
  "Pirojpur",
  "Jhalokathi",
  "Barguna",
  "Sylhet",
  "Sunamganj",
  "Moulvibazar",
  "Habiganj",
  "Rangpur",
  "Dinajpur",
  "Gaibandha",
  "Nilphamari",
  "Kurigram",
  "Lalmonirhat",
  "Thakurgaon",
  "Panchagarh",
  "Mymensingh",
  "Jamalpur",
  "Sherpur",
  "Netrokona",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, user } = useAppContext();
  const isCustomer = user?.role === "customer";

  const availablePoints = isCustomer ? user?.points || 0 : 0;
  const POINT_VALUE = 1;

  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  // Billing fields
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [thana, setThana] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Shipping & payment
  const [shippingMethod, setShippingMethod] = useState("home"); // home / express
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [termsChecked, setTermsChecked] = useState(true);

  // Errors
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Derived totals
  const getShippingCharge = (district, method) => {
    const isDhaka = district === "Dhaka";
    if (method === "home") return isDhaka ? 60 : 90;
    if (method === "express") return isDhaka ? 120 : 150;
    return 0;
  };

  // District filter
  const filtered = districts.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase()),
  );

  // Validation
  const validateForm = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!address.trim()) e.address = "Address is required.";
    if (!city.trim()) e.city = "Town/City is required.";
    if (!phone.trim()) e.phone = "Phone number is required.";
    if (!email.trim()) e.email = "Valid email is required.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) e.email = "Enter a valid email.";
    }
    if (!thana.trim()) e.thana = "Upazila/Thana is required.";
    if (!selectedDistrict) e.district = "District is required.";
    if (!paymentMethod) e.paymentMethod = "Please select a payment method.";
    if (!termsChecked) e.termsChecked = "You must agree to terms.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- TOTAL PRODUCT PRICE ---------------- */
  const totalProductPrice = cart.reduce((sum, item) => {
    const price =
      user?.role === "reseller"
        ? Number(item.resellerPrice) || 0
        : Number(item.offerPrice) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  /* ---------------- POINTS CALCULATION ---------------- */
  const maxUsablePoints =
    user?.role === "customer"
      ? Math.min(availablePoints, Math.floor(totalProductPrice / POINT_VALUE))
      : 0;

  const appliedPoints =
    user?.role === "customer" && usePoints
      ? Math.min(Number(pointsToUse) || 0, maxUsablePoints)
      : 0;

  const pointsDiscount = appliedPoints * POINT_VALUE;

  /* ---------------- FINAL TOTAL ---------------- */
  const finalTotalAmount =
    totalProductPrice +
    getShippingCharge(selectedDistrict, shippingMethod) -
    pointsDiscount;

  const totalEarnedPoints =
    user?.role === "customer"
      ? cart.reduce((acc, item) => {
          if (item.hasOffer) return acc;
          const productPoint = Math.floor(
            ((Number(item.offerPrice) || 0) / 100) *
              (Number(item.quantity) || 0),
          );
          return acc + Math.min(productPoint, 500);
        }, 0)
      : 0;

  const handlePointsChange = (e) => {
    let value = Number(e.target.value);

    if (isNaN(value)) value = 0;

    if (value < 0) value = 0;

    if (value > maxUsablePoints) {
      value = maxUsablePoints;
    }
    setPointsToUse(value);
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const billing = {
      fullName,
      address,
      city,
      thana,
      district: selectedDistrict,
      phone,
      email,
      comment,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          billing,
          cart,
          shippingMethod,
          shippingCharge: getShippingCharge(selectedDistrict, shippingMethod),
          paymentMethod,
          usedPoints: Number(appliedPoints) || 0,
          pointsDiscount: Number(pointsDiscount) || 0,
          earnedPoints: Number(totalEarnedPoints) || 0,
          grandTotal: Number(finalTotalAmount) || 0,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`Order failed: ${data.error || "Something went wrong"}`);
        setTimeout(() => setMessage(""), 1500);
        return;
      }

      // Success
      setMessage(`Order placed successfully!`);
      clearCart();
      setTimeout(() => setMessage(""), 1500);

      // Optional redirect
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${data.orderId}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("Order failed: Try again");
    }
  };

  return (
    <div className="w-full h-full universal">
      <div className="w-full sm:w-full md:w-[60%] px-5 h-full min-h-screen py-10 mt-14">
        <h1 className="text-2xl font-medium text-[#931905] capitalize">
          Billing details
        </h1>

        <form
          className="flex flex-col items-stretch gap-1"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="w-full flex flex-col">
            <label>
              Full Name <span className="req_hash">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name ..."
              className="checkout_inp"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Address */}
          <div className="w-full flex flex-col">
            <label>
              Address <span className="req_hash">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House number and Street name"
              className="checkout_inp mb-2"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* City */}
          <div className="w-full flex flex-col">
            <label>
              Town / City <span className="req_hash">*</span>
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Town / City"
              className="checkout_inp mb-2"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          {/* Phone */}
          <div className="w-full flex flex-col">
            <label>
              Phone Number <span className="req_hash">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="checkout_inp mb-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="w-full flex flex-col">
            <label>
              Email Address <span className="req_hash">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="checkout_inp mb-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Thana */}
          <div className="w-full flex flex-col">
            <label>
              Upazila/Thana <span className="req_hash">*</span>
            </label>
            <input
              type="text"
              value={thana}
              onChange={(e) => setThana(e.target.value)}
              placeholder="Upazila/Thana"
              className="checkout_inp mb-2"
            />
            {errors.thana && (
              <p className="text-red-500 text-sm">{errors.thana}</p>
            )}
          </div>

          {/* District */}
          <div className="w-full flex flex-col relative">
            <label>
              District <span className="req_hash">*</span>
            </label>
            <div
              onClick={() => setOpen(!open)}
              className="checkout_inp cursor-pointer bg-transparent text-[#2B2A29]"
            >
              {selectedDistrict}
            </div>
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district}</p>
            )}

            {open && (
              <div className="w-full bg-white border border-[#dddddd] shadow-lg z-50 absolute">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search district..."
                  className="w-full px-3 py-2 border-b border-b-[#dddddd] bg-transparent outline-none text-black"
                />
                <div className="max-h-[250px] overflow-y-auto">
                  {filtered.map((district) => (
                    <div
                      key={district}
                      onClick={() => {
                        setSelectedDistrict(district);
                        setOpen(false);
                        setSearch("");
                      }}
                      className="px-3 py-2 bg-white text-black cursor-pointer hover:bg-[#F2F4F8]"
                    >
                      {district}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="w-full flex flex-col">
            <label>Message</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Message"
              className="checkout_inp mb-2"
            />
          </div>

          {/* Order summary */}
          <div className="w-full mt-5">
            <h1 className="text-2xl font-medium text-[#931905] capitalize mb-2">
              Your Order
            </h1>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="p-2 border border-[#dddddd] uppercase">
                    Product
                  </th>
                  <th className="p-2 border border-[#dddddd] uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item) => (
                  <tr key={item._id} className="text-left">
                    <td className="p-2 border border-[#dddddd]">
                      {item.name} x {item.quantity}
                    </td>
                    <td className="p-2 border border-[#dddddd]">
                      <span className="taka">৳- </span>{" "}
                      {Number(
                        user?.role === "reseller"
                          ? item.resellerPrice * item.quantity
                          : item.offerPrice * item.quantity,
                      ).toLocaleString("en-IN")}
                      /=
                    </td>
                  </tr>
                ))}
              </tbody>
              <thead>
                <tr className="text-left">
                  <td className="p-2 border border-[#dddddd] uppercase font-bold">
                    Shipping
                  </td>
                  <td className="p-2 border border-[#dddddd] rounded flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="Shipping"
                        checked={shippingMethod === "home"}
                        onChange={() => setShippingMethod("home")}
                      />
                      Home Delivery: ৳-{" "}
                      {getShippingCharge(selectedDistrict, "home")}/=
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="Shipping"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                      />
                      Request Express: ৳-{" "}
                      {getShippingCharge(selectedDistrict, "express")}/=
                    </div>
                  </td>
                </tr>
                <tr className="text-left">
                  <th className="p-2 border border-[#dddddd] uppercase">
                    Total
                  </th>
                  <th className="p-2 border border-[#dddddd] rounded flex items-center justify-between gap-1.5">
                    <p>
                      <span className="taka">৳- </span>
                      {Number(finalTotalAmount).toLocaleString("en-IN")}/=
                    </p>
                    {user?.role === "customer" && (
                      <span className="flex items-center text-[#931905]">
                        {totalEarnedPoints} <IoMdStar />
                      </span>
                    )}
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* use points */}
          {isCustomer && (
            <div className="w-full p-3 bg-gray-200 mt-5 rounded">
              <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
                Use Reward Points <IoMdStar className="text-[#931905]" />
              </h2>

              <p className="text-base mb-2">
                Available Points:
                <span className="font-semibold text-[#931905] ml-1">
                  {availablePoints}
                </span>
                (1 Point = {POINT_VALUE} tk)
              </p>

              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => {
                    setUsePoints(e.target.checked);
                    if (!e.target.checked) setPointsToUse(0);
                  }}
                />
                <span>Use points for this order</span>
              </div>

              {usePoints && (
                <div className="flex flex-col">
                  <input
                    type="number"
                    min={0}
                    max={maxUsablePoints}
                    value={pointsToUse === 0 ? "" : pointsToUse}
                    onChange={handlePointsChange}
                    className="checkout_inp w-full"
                    placeholder="Enter points"
                  />

                  <p className="text-lg text-green-600">
                    Discount: <span className="taka">৳ - </span>{" "}
                    {pointsDiscount}/=
                  </p>

                  <p className="text-xs text-red-500">
                    Max usable points: {maxUsablePoints}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Payment */}
          <div className="w-full mt-5">
            <h1 className="text-2xl font-medium text-[#931905] capitalize mb-2">
              Payment Method
            </h1>
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                />
                Cash on Delivery
              </div>
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Online Payment"}
                  onChange={() => setPaymentMethod("Online Payment")}
                />
                Online Payment
              </div>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
              )}
            </div>

            <div className="p-3 border border-red-600 rounded-sm bg-amber-200 my-3">
              <h1 className="text-xl font-medium text-[#2B2A29] flex items-start gap-2">
                <FaHandPointRight className="mt-1 text-red-600 w-5 min-w-5" />
                Please pay delivery fee for confirm your order. Use order ID in
                your reference.
              </h1>
            </div>

            <div className="w-full flex items-start gap-1.5 mb-5">
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                className="mt-[5px]"
              />
              <p className="i_agree flex items-center flex-wrap gap-1.5">
                I have read and agree to the
                <a
                  href="/terms-condition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions,
                </a>
                <a
                  href="/privecy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                and
                <a
                  href="/return-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Refund and Return Policy.
                </a>
              </p>
              {errors.termsChecked && (
                <p className="text-red-500 text-sm">{errors.termsChecked}</p>
              )}
            </div>

            {/* Success / Error Message */}
            {message && (
              <div
                className={`p-3 rounded font-base ${
                  message.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <div className="w-full flex items-center justify-end">
              <button
                type="submit"
                className="buy_btn"
                disabled={!termsChecked}
                style={{ opacity: termsChecked ? 1 : 0.6 }}
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
