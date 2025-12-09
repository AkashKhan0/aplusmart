"use client";

import { useAppContext } from "@/src/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { cart, saveCart, updateCartQuantity, removeCartItem } =
    useAppContext();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full h-full universal">
      <div className="fixed_width px-5 h-full min-h-screen universal_column">
        <div className="w-full h-full min-h-screen py-10">

          {cart.length === 0 ? (
            <>
              <div className="universal_column">
                <Image
                  src="/images/empty-cart.svg"
                  alt="A Plus Mart BD"
                  width={500}
                  height={500}
                  className="object-contain min-w-20 max-w-[300px]"
                />
                <p className="text-xl font-bold text-[#931905] capitalize">
                  Opps!
                </p>

                <p className="text-center text-gray-500 my-5">
                  Your shopping cart is empty!
                </p>
                <Link href="/">
                  <button className="bg-[#931905] py-1 px-5 rounded text-[#FFFFFF] cursor-pointer">
                    Shop now
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full overflow-x-auto pb-5">
              <table className="w-full border-collapse">
                <thead className="">
                  <tr className="text-left">
                    <th className="p-2 bg-[#dddddd] border-r-2 border-r-[#FFFFFF]">
                      Image
                    </th>
                    <th className="p-2 bg-[#dddddd] border-r-2 border-r-[#FFFFFF]">
                      Product name
                    </th>
                    <th className="p-2 bg-[#dddddd] border-r-2 border-r-[#FFFFFF]">
                      Quantity
                    </th>
                    <th className="p-2 bg-[#dddddd] border-r-2 border-r-[#FFFFFF]">
                      Price
                    </th>
                    <th className="p-2 text-end bg-[#dddddd]">Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b border-b-[#dddddd]">
                      {/* IMAGE */}
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </td>

                      {/* NAME */}
                      <td className="px-2">
                        <h3 className="font-medium capitalize">{item.name}</h3>
                        <div className="flex gap-2 mt-1">
                          {item.colors.map((color, i) => (
                            <span
                              key={i}
                              className="text-xs w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            ></span>
                          ))}
                        </div>
                      </td>

                      {/* QUANTITY */}
                      <td className="px-2">
                        <div className="flex items-center">
                          <button
                            className="px-2 bg-gray-200 rounded text-xl"
                            onClick={() => updateCartQuantity(item.id, "dec")}
                          >
                            -
                          </button>

                          <span className="font-semibold px-3">
                            {item.quantity}
                          </span>

                          <button
                            className="px-2 bg-gray-200 rounded text-xl"
                            onClick={() => updateCartQuantity(item.id, "inc")}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* PRICE */}
                      <td className="px-2 font-semibold">
                        <span className="taka">৳ - </span>
                        {item.price * item.quantity} /-
                      </td>

                      {/* REMOVE ICON */}
                      <td className="px-2 text-end">
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-lg cursor-pointer"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* TOTAL + CHECKOUT */}
              <div className="flex justify-end items-center gap-5 my-5">
                <h2 className="text-xl font-semibold">
                  Cart Total :{" "}
                  <span className="text-base font-bold taka_font">৳- </span>
                  {totalPrice} /-
                </h2>
              </div>

              <div className="w-full mt-10 mb-5">
                <h1 className="text-xl font-semibold">
                  What would you like to do next?
                </h1>
              </div>

              <div className="w-full flex items-center justify-between">
                <Link href="/">
                  <button className="buy_btn">Continue Shopping</button>
                </Link>
                <Link href="/checkout">
                  <button className="buy_btn">Checkout</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
