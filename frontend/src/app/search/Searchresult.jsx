"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/src/context/AppContext";
import { FaEye, FaEyeSlash, FaShoppingCart } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";

const openMessenger = () => {
  const appWindow = window.open("https://m.me/aaplusmartbd", "_blank");
  setTimeout(() => {
    if (!appWindow || appWindow.closed) {
      window.open("https://www.messenger.com/t/aaplusmartbd", "_blank");
    }
  }, 800);
};

export default function Searchresult() {
  const [q, setQ] = useState(null);
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, addToCart } = useAppContext();
  const [successProductId, setSuccessProductId] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // ✅ Read query params safely (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get("q"));
    setMainCategory(params.get("mainCategory"));
    setSubCategory(params.get("subCategory"));
  }, []);

  // ✅ Fetch products from API
  useEffect(() => {
    if (q === null && mainCategory === null && subCategory === null) {
      return;
    }

    if (!q && !mainCategory && !subCategory) {
      setLoading(false);
      return;
    }

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?`;
    const query = [];

    if (q) query.push(`q=${encodeURIComponent(q)}`);
    if (mainCategory)
      query.push(`mainCategory=${encodeURIComponent(mainCategory)}`);
    if (subCategory)
      query.push(`subCategory=${encodeURIComponent(subCategory)}`);

    url += query.join("&");

    const fetchProducts = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [q, mainCategory, subCategory]);

  // add to cart handler
  const handleAddToCart = (product) => {
    if (!user) {
      setShowLoginModal(true); // ✅ login popup open
      return;
    }

    const quantity = user.role === "reseller" ? 10 : 1;

    const hasOffer =
      product?.offerPrice > 0 &&
      product?.regularPrice > 0 &&
      product.offerPrice < product.regularPrice;

    const discountPercent = hasOffer
      ? Math.round(
          ((product.regularPrice - product.offerPrice) / product.regularPrice) *
            100,
        )
      : 0;

    const cartItem = {
      productId: product._id,
      name: product.name,
      images: product.images,
      quantity,
      colors: [],
      role: user.role,
      ...(user.role === "reseller"
        ? {
            resellerPrice: product.resellerPrice,
          }
        : {
            offerPrice: product.offerPrice,
            regularPrice: product.regularPrice,
            hasOffer,
            discountPercent,
          }),
    };

    addToCart(cartItem);
    setSuccessProductId(product._id);
    setTimeout(() => {
      setSuccessProductId(null);
    }, 2000);
  };

  if (loading)
    return (
      <div className="w-full universal py-10">
        <div className="fixed_width px-5 universal_column h-full min-h-screen">
          <div className="w-full max-w-[200px]">
            <Image
              src="/images/clock.gif"
              alt="Please wait"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full h-fit universal">
        <div className="fixed_width h-full min-h-screen p-5 mt-20">
          <h2 className="text-xl font-bold mb-5">
            Results for:{" "}
            <span className="text-red-500">
              {q || mainCategory || subCategory}
            </span>
          </h2>

          {products.length === 0 ? (
            <p>No products found!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 items-stretch">
              {products.map((item) => (
                <Link
                  key={item._id}
                  href={
                    user?.role === "reseller" ? "#" : `/products/${item._id}`
                  }
                  onClick={(e) => {
                    if (user?.role === "reseller") {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="bg-white rounded-md shadow-2xl hover:shadow-md transition relative border-2 border-transparent hover:border-[#c9c9c9] h-full overflow-hidden universal_column">
                    {/* % OFF */}
                    {user?.role === "customer" &&
                      item?.offerPrice > 0 &&
                      item?.regularPrice > 0 &&
                      item.offerPrice < item.regularPrice && (
                        <div className="w-20 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center justify-center text-sm font-medium uppercase">
                          {Math.round(
                            ((item.regularPrice - item.offerPrice) /
                              item.regularPrice) *
                              100,
                          )}
                          % off
                        </div>
                      )}

                    <div className="w-full h-[200px] sm:h-[250px] overflow-hidden mb-1">
                      <Image
                        src={item.images?.[0]}
                        alt={item.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-fill"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-between py-2 gap-1.5 bg-[#e9e9e9] rounded-t-2xl h-full w-full max-h-[150px]">
                      <div className="universal_column gap-1.5">
                        <h1 className="text-sm font-medium text-center capitalize px-1">
                          {item.name}
                        </h1>

                        {user?.role !== "reseller" && (
                          <p className="text-[#d42300] text-sm flex items-center gap-1 font-bold">
                            <span className="taka">৳-</span>
                            {Number(item.offerPrice).toLocaleString("en-IN")}
                            /-
                            {/* Show regular price */}
                            {item?.regularPrice > 0 && (
                              <del className="text-sm text-[#2B2A29]">
                                <span className="taka">৳-</span>
                                {Number(item.regularPrice).toLocaleString(
                                  "en-IN",
                                )}
                                /-
                              </del>
                            )}
                          </p>
                        )}
                      </div>

                      {/* add to cart button */}
                      <div className="w-full flex flex-col items-center justify-center mb-2">
                        {user?.role === "reseller" ? (
                          <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                window.open(
                                  "https://wa.me/8801853838891",
                                  "_blank",
                                )
                              }
                              className="w-full max-w-fit flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5d] text-white shadow hover:scale-[1.02] transition cursor-pointer active:translate-y-1 active:shadow-[0_2px_0_#d1a900]"
                            >
                              <FaWhatsapp size={17} />
                              WhatsApp
                            </button>

                            <button
                              onClick={openMessenger}
                              className="w-full max-w-fit flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#0084FF] to-[#006eff] text-white shadow hover:scale-[1.02] transition cursor-pointer active:translate-y-1 active:shadow-[0_2px_0_#d1a900]"
                            >
                              <RiMessengerLine size={18} />
                              Messenger
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                            className="add_to_cart_btn"
                          >
                            <span
                              className={
                                item.stockStatus !== "inStock"
                                  ? "text-red-700"
                                  : ""
                              }
                            >
                              {item.stockStatus === "inStock"
                                ? "Add to Cart"
                                : "Pre Order"}
                            </span>
                            <span className="shop_btn_icon">
                              <FaShoppingCart />
                            </span>
                          </button>
                        )}
                        {successProductId === item._id && (
                          <p className="text-green-600 text-xs mt-1">
                            Added to cart!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white p-5 rounded-sm w-full max-w-[400px] relative shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 font-bold text-lg duration-300 hover:text-[#931905] cursor-pointer"
              onClick={() => setShowLoginModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-2 text-center">
              Account Login
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;

                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/userauth/login`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({ email, password }),
                    },
                  );
                  const data = await res.json();
                  if (!res.ok) {
                    alert(data.error || "Login failed");
                    return;
                  }

                  // login successful
                  setShowLoginModal(false);
                  window.location.reload(); // reload to update user context
                } catch (err) {
                  alert("Something went wrong");
                }
              }}
              className="flex flex-col gap-1"
            >
              {/* Email */}
              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="border border-gray-300 rounded-sm px-3 py-2 outline-none w-full"
                  required
                />
              </div>

              {/* Password with Eye Icon */}
              <div className="flex flex-col relative">
                <label className="font-semibold">Password</label>
                <div className="border border-gray-300 rounded-sm mb-1 relative flex items-center px-3 py-2">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="outline-none w-full"
                    required
                  />
                  <span
                    className="right-3 top-9 cursor-pointer text-gray-600"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="bg-[#FFCE1B] hover:bg-[#fdc701] py-1 rounded-sm font-semibold text-lg cursor-pointer"
              >
                Login
              </button>

              {/* Optional: Register link */}
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                  onClick={() => setShowLoginModal(false)}
                >
                  Register
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <Link
                  href="/forgot-password"
                  className="text-base font-medium text-green-600 hover:text-green-800 duration-300"
                >
                  Forget password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
