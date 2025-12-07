"use client";

import { useAppContext } from "@/src/context/AppContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, saveCart, updateCartQuantity, removeCartItem } = useAppContext();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="w-full min-h-screen p-5 universal">
      <div className="fixed_width p-5">
        <h1 className="text-2xl font-semibold mb-5">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">
            Your cart is empty. <Link href="/" className="text-blue-600">Shop now</Link>
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-3 p-3 border rounded-md shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-2 w-full">
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      Colors: {item.colors.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <button onClick={() => updateCartQuantity(item.id, "dec")} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, "inc")} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    <button onClick={() => removeCartItem(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end items-center gap-5 mt-5">
              <h2 className="text-xl font-semibold">Total: ${totalPrice}</h2>
              <Link href="/checkout" className="bg-[#FFCE1B] py-2 px-4 rounded font-semibold hover:bg-[#fdc701] duration-300">
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
