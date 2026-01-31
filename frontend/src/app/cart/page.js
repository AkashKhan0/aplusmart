"use client";

import { useAppContext } from "@/src/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";

export default function CartPage() {
  const { cart, user, updateQuantity, removeFromCart } = useAppContext();

  const isEmpty = !cart || cart.length === 0;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.offerPrice * item.quantity,
    0,
  );

  // const step = user?.role === "reseller" ? 50 : 1;
  // const minQty = user?.role === "reseller" ? 50 : 1;

  const getStep = (item) => (item.role === "reseller" ? 50 : 1);
  const getMin = (item) => (item.role === "reseller" ? 50 : 1);

  /* =====================
     EMPTY CART
  ===================== */
  if (isEmpty) {
    return (
      <div className="w-full h-full universal">
        <div className="fixed_width px-5 h-full min-h-screen universal_column py-10 mt-10">
          <Image
            src="/images/empty-cart.svg"
            alt="A Plus Mart BD"
            width={500}
            height={500}
            className="object-contain max-w-[300px]"
          />
          <p className="text-xl font-bold text-[#931905] capitalize">Oops!</p>
          <p className="text-center text-gray-500 my-5">
            Your shopping cart is empty!
          </p>
          <Link href="/">
            <button className="buy_btn">
              <span>Shop now</span>
              <span className="text-sm shop_btn_icon">
                <GiShoppingBag />
              </span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  /* =====================
     CART TABLE
  ===================== */
  return (
    <div className="w-full h-full universal">
      <div className="fixed_width p-3 min-h-screen mt-16">
        <div className="w-full overflow-x-auto py-5">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="p-2 bg-[#dddddd] border border-gray-300">Image</th>
                <th className="p-2 bg-[#dddddd] border border-gray-300">Product</th>
                <th className="p-2 bg-[#dddddd] border border-gray-300">Quantity</th>
                <th className="p-2 bg-[#dddddd] border border-gray-300">Price</th>
                <th className="p-2 bg-[#dddddd] border border-gray-300 text-end">Cancel</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b border-b-gray-300">
                  {/* IMAGE */}
                  <td className="p-2">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-10 h-10 object-contain"
                    />
                  </td>

                  {/* NAME */}
                  <td className="px-2">
                    <h3 className="font-medium capitalize">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-full flex items-center gap-1">
                        {item.colors && item.colors.length > 0 ? (
                          item.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: c }}
                            />
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No color selected {item.colors}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* QUANTITY */}
                  <td className="px-2">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(
                              item.quantity - getStep(item),
                              getMin(item),
                            ),
                          )
                        }
                        className="px-2 bg-gray-200 rounded text-xs py-1.5"
                      >
                        <FaMinus />
                      </button>

                      <span className="font-semibold px-3">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + getStep(item),
                          )
                        }
                        className="px-2 bg-gray-200 rounded text-xs py-1.5"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-2 font-semibold">
                    <span className="taka">৳-</span>
                    {Number(item.offerPrice * item.quantity).toLocaleString(
                      "en-IN",
                    )}
                    /=
                  </td>

                  {/* DELETE */}
                  <td className="px-2 text-end">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-[#000000] text-lg cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTAL */}
          <div className="flex justify-end my-5">
            <h2 className="text-sm font-semibold">
              Cart Total : <span className="taka">৳- </span>{" "}
              {Number(totalPrice).toLocaleString("en-IN")} /=
            </h2>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between mt-7">
            <Link href="/">
              <button className="buy_btn">
                
                              <span>Shop More</span>
                              <span className="text-sm shop_btn_icon"><FaCartArrowDown /></span>
              </button>
            </Link>
            <Link href="/checkout">
              <button className="buy_btn">                
              <span>Purchase</span>
              <span className="text-sm shop_btn_icon"><GiShoppingBag /></span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
