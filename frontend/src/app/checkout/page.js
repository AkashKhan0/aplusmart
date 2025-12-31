"use client";

import { useState, useEffect } from "react";
import { FaHandPointRight } from "react-icons/fa";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";

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

  // Billing fields
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [thana, setThana] = useState("");
  // District dropdown
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("")

  // Shipping and payment
  const [shippingMethod, setShippingMethod] = useState("home"); // 'home' or 'express'
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery"); // required
  const [termsChecked, setTermsChecked] = useState(true); // default checked

  // error messages
  const [errors, setErrors] = useState({});

  // Shipping charge derived from district + method
  const getShippingCharge = (district, method) => {
    const isDhaka = district === "Dhaka";
    if (method === "home") return isDhaka ? 60 : 90;
    if (method === "express") return isDhaka ? 120 : 150;
    return 0;
  };



  // Filtered district list for search
  const filtered = districts.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  // Validation function - returns boolean
  const validateForm = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!address.trim()) e.address = "Address is required.";
    if (!city.trim()) e.city = "Town/City is required.";
    if (!phone.trim()) e.phone = "Phone number is required.";
    if (!email.trim()) e.email = "Email is required.";
    else {
      // simple email check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) e.email = "Enter a valid email.";
    }
    if (!thana.trim()) e.thana = "Upazila/Thana is required.";
    if (!selectedDistrict) e.district = "District is required.";
    if (!paymentMethod) e.paymentMethod = "Please select a payment method.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };


  return (
    <>
      <div className="w-full h-full universal">
        <div className="w-full sm:w-full md:w-[60%] px-5 h-full min-h-screen py-10">
          <h1 className="text-2xl font-medium text-[#931905] capitalize">
            Billing details
          </h1>

          <form
            className="flex flex-col items-stretch gap-1"
          >
            {/* name */}
            <div className="w-full flex flex-col">
              <label>
                your full name<span className="req_hash">*</span>
              </label>
              <input
                type="text"
                placeholder="your full name ..."
                className="checkout_inp"
              />
            </div>

            {/* address */}
            <div className="w-full flex flex-col">
              <label>
                address<span className="req_hash">*</span>
              </label>
              <input
                type="text"
                placeholder="House number and Street name"
                className="checkout_inp mb-2"
              />
            </div>

            {/* Town / City */}
            <div className="w-full flex flex-col">
              <label>
                Town / City<span className="req_hash">*</span>
              </label>
              <input
                type="text"
                placeholder="Town / City"
                className="checkout_inp mb-2"
              />
            </div>

            {/* Phone Number */}
            <div className="w-full flex flex-col">
              <label>
                Phone Number<span className="req_hash">*</span>
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="checkout_inp mb-2"
              />
            </div>

            {/* Email address */}
            <div className="w-full flex flex-col">
              <label>
                Email address<span className="req_hash">*</span>
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="checkout_inp mb-2"
              />
            </div>

            {/* Upazila/Thana */}
            <div className="w-full flex flex-col">
              <label>
                Upazila/Thana<span className="req_hash">*</span>
              </label>
              <input
                type="text"
                placeholder="Upazila/Thana"
                className="checkout_inp mb-2"
              />
            </div>

            {/* District */}
            <div className="w-full flex flex-col relative">
              <label>
                District<span className="req_hash">*</span>
              </label>

              <div
                onClick={() => setOpen(!open)}
                className="checkout_inp cursor-pointer bg-transparent text-[#2B2A29]"
              >
                {selectedDistrict}
              </div>
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">{errors.district}</p>
              )}

              {/* Dropdown */}
              {open && (
                <div className="w-full bg-white border border-[#dddddd] shadow-lg z-50 absolute">
                  {/* Search */}
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search district..."
                    className="w-full px-3 py-2 border-b border-b-[#dddddd] bg-transparent outline-none text-black"
                  />

                  {/* Options */}
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

            {/* Message (NOT required) */}
            <div className="w-full flex flex-col">
              <label>Message</label>
              <textarea placeholder="Message" className="checkout_inp mb-2" />
            </div>

            {/* order payment system */}
            <div className="w-full mt-5">
              <h1 className="text-2xl font-medium text-[#931905] capitalize mb-2">
                your order
              </h1>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="p-2 border border-[#dddddd] uppercase">
                      product
                    </th>
                    <th className="p-2 border border-[#dddddd] rounded uppercase">
                      amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* render cart items */}
                    <tr className="text-left"
                    >
                      <td className="p-2 border border-[#dddddd]">
                        it.name x it.quantity
                      </td>
                      <td className="p-2 border border-[#dddddd]">
                        <span className="taka">৳ -</span>
                        it.price * it.quantity /-
                      </td>
                    </tr>
                </tbody>

                {/* shipping */}
                <thead className="">
                  <tr className="text-left">
                    <td className="p-2 border border-[#dddddd] uppercase font-bold">
                      Shipping
                    </td>
                    <td className="p-2 border border-[#dddddd] rounded">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="Shipping"
                          />
                          Home Delivery: <span className="taka">৳ -</span>
                          {getShippingCharge(selectedDistrict, "Home Delivery")}/-
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="Shipping"
                            checked={shippingMethod === "express"}
                            onChange={() => setShippingMethod("express")}
                          />
                          Request Express: <span className="taka">৳ -</span>{" "}
                          {getShippingCharge(selectedDistrict, "Request Express")}/-
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr className="text-left">
                    <th className="p-2 border border-[#dddddd] uppercase">
                      Total
                    </th>
                    <th className="p-2 border border-[#dddddd] rounded flex items-center justify-between gap-1.5">
                      <span className="taka">৳ - grandTotal-</span> <span className="flex items-center text-[#931905]"> earnedPoints <IoMdStar /></span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* payment method */}
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
                  <span>Cash on delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "Online Payment"}
                    onChange={() => setPaymentMethod("Online Payment")}
                  />
                  <span>Online Payment</span>
                </div>
              </div>

              <h1 className="text-xl font-medium text-[#2B2A29] my-5 flex items-start gap-2">
                <FaHandPointRight className="mt-1 text-red-600" /> Please pay
                delivery fee for confirm your order. Use order ID in your
                reference.
              </h1>

              <div className="w-full flex items-center gap-1.5 mb-5">
                <input
                  type="checkbox"
                  name="place_order"
                />
                <p className="i_agree flex items-center gap-1.5">
                  I have read and agree to the
                  <a
                    href="/terms-condition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
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
              </div>

              <div className="w-full flex items-center justify-end">
                <button
                  type="submit"
                  className="buy_btn"
                  disabled={!termsChecked}
                  style={{
                    opacity: termsChecked ? 1 : 0.6,
                    pointerEvents: termsChecked ? "auto" : "none",
                  }}
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
