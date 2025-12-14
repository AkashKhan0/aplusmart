"use client";

import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoMdDoneAll, IoMdStar } from "react-icons/io";
import Image from "next/image";

export default function OrderList() {
  return (
    <div className="w-full universal_column">
      <h1 className="text-2xl font-bold text-[#931905] ">All Orders</h1>
      <div className="w-full max-w-[60%] border my-5 flex items-stretch">
        <input type="search" placeholder="search product" className="w-full py-2 px-3" />
        <button className="px-3 border bg-[#666] text-white uppercase">search</button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Details</th>
              <th className="p-2 border">Method</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-2 border">
                <Image
                  src="/"
                  alt="image name"
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
              </td>
              <td className="p-2 border">
                <p>Order ID</p>
                <p>Customer name</p>
                <p>Product ID</p>
                <p>Product Name</p>
                <p>Product quantity</p>
                <p>Color</p>
              </td>
              <td className="p-2 border">
                <p>Shipping method</p>
                <p>Payment method</p>
                <p className="flex items-center gap-1.5">
                  Points <IoMdStar className="text-yellow-500" />
                </p>
                <p>Total amount </p>
              </td>
              <td className="p-2 border">
                <select className="border outline-none rounded px-1 py-0.5">
                  <option value="pending">Not Yet! ❌</option>
                  <option value="confirmed">Delivery Fee ⛟</option>
                  <option value="shipped">Paid ✔ </option>
                </select>
              </td>
              <td className="p-2 border">
                <select className="border outline-none rounded px-1 py-0.5">
                  <option value="pending">Pending ⴵ</option>
                  <option value="confirmed">Confirmed ✔</option>
                  <option value="shipped">Shipped ⛟</option>
                  <option value="delivered">Delivered 📦</option>
                  <option value="cancelled">Cancelled ⊘</option>
                </select>
              </td>
              <td className="p-2 border text-2xl">
                <button className="text-red-600 hover:text-red-800 mr-3">
                  <FiTrash2 />
                </button>
                <button className="text-green-500 hover:text-green-800">
                  <IoMdDoneAll />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
