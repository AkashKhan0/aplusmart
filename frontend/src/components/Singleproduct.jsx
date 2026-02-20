"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaMinus, FaPenNib, FaPlus } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { GiCrossMark, GiShoppingBag } from "react-icons/gi";

export default function Singleproduct() {
  const { id } = useParams();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { user, addToCart } = useAppContext();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  // Review states
  const [reviews, setReviews] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  // review form states
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState(""); // "error" | "success"
  const [showThankYou, setShowThankYou] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`${API}/api/products/${id}`);
        const data = await res.json();
        const productData = data.product || {};
        const related = data.relatedProducts || [];
        setProduct(productData);
        setRelatedProducts(related);

        if (productData?.images?.length > 0)
          setActiveImage(productData.images[0]);
        if (user?.role === "reseller") setQuantity(10);
      } catch (err) {
        console.error("LOAD FAILED:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id, user]);

  const handleQuantityChange = (type) => {
    let newQuantity = quantity;

    if (!user) {
      if (type === "inc") newQuantity = quantity + 1;
      if (type === "dec") newQuantity = Math.max(1, quantity - 1);
    } else if (user.role === "customer") {
      if (type === "inc") newQuantity = quantity + 1;
      if (type === "dec") newQuantity = Math.max(1, quantity - 1);
    } else if (user.role === "reseller") {
      if (type === "inc") newQuantity = quantity + 10;
      if (type === "dec") newQuantity = Math.max(10, quantity - 10);
    }
    setQuantity(newQuantity);
    setSelectedColor((prev) => prev.slice(0, newQuantity));
  };

  /* ================= COLOR HANDLER ================= */
  const handleColorSelect = (color) => {
    if (quantity === 1) {
      if (selectedColor[0] === color) {
        setSelectedColor([]); // same color click করলে unselect
      } else {
        setSelectedColor([color]); // নতুন color select → আগেরটা remove
      }
      return;
    }

    if (selectedColor.includes(color)) {
      setSelectedColor(selectedColor.filter((c) => c !== color));
      return;
    }

    if (selectedColor.length >= quantity) {
      setMessage(`You can select maximum ${quantity} colors`);
      setMessageType("error");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    setSelectedColor([...selectedColor, color]);
  };

  const handleBuyNow = () => {
    if (!user) return;
    if (selectedColor.length === 0) {
      setMessage("Please select at least one color!");
      setMessageType("error");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    if (selectedColor.length > quantity) {
      setMessage(`You can select maximum ${quantity} color(s)!`);
      setMessageType("error");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    const cartItem = {
      _id: product._id,
      name: product.name,
      images: product.images,
      quantity,
      colors: selectedColor,
      role: user.role,
      ...(user.role === "customer"
        ? {
            offerPrice: product.offerPrice,
            regularPrice: product.regularPrice,
            hasOffer,
            discountPercent,
            earnedPoints,
          }
        : { resellerPrice: product.resellerPrice }),
    };
    addToCart(cartItem);
    setMessage("Added to cart!");
    setMessageType("success");
    setTimeout(() => {
      setMessage("");
      router.push("/cart");
    }, 2000);
  };

  const hasOffer =
    product?.offerPrice > 0 &&
    product?.regularPrice > 0 &&
    product.offerPrice < product.regularPrice;

  const discountPercent =
    user?.role === "customer" && hasOffer
      ? Math.round(
          ((product.regularPrice - product.offerPrice) / product.regularPrice) *
            100,
        )
      : 0;

  // ✅ UPDATED POINTS LOGIC
  const earnedPoints =
    user?.role === "customer" && product?.offerPrice > 0
      ? Math.min(
          Math.floor((product.offerPrice * (product.quantity || 1)) / 100),
          500,
        )
      : 0;

  // Fetch reviews
  async function loadReviews() {
    if (!id) return;

    try {
      const res = await fetch(`${API}/api/products/${id}/reviews`);
      if (!res.ok) return;

      const data = await res.json();
      setReviews(data || []);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  }

  useEffect(() => {
    if (!id) return;
    loadReviews();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!reviewRating || !reviewMessage) {
      setFormMessage("Please select rating and write a message!");
      setFormMessageType("error");
      setTimeout(() => setFormMessage(""), 3000);
      return;
    }

    try {
      const res = await fetch(`${API}/api/products/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: reviewRating,
          message: reviewMessage,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setShowThankYou(true);
        setReviewRating(0);
        setReviewMessage("");
        loadReviews();
        setTimeout(() => {
          setShowThankYou(false);
          setReviewModalOpen(false);
        }, 3000);
      } else {
        setFormMessage(data.error || "Failed to submit review");
        setFormMessageType("error");
        setTimeout(() => setFormMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setFormMessage("Failed to submit review");
      setFormMessageType("error");
      setTimeout(() => setFormMessage(""), 3000);
    }
  };

  const handleNext = () => {
    if (!product?.images?.length) return;
    const nextIndex = (currentIndex + 1) % product.images.length;
    setCurrentIndex(nextIndex);
    setActiveImage(product.images[nextIndex]);
  };

  const handlePrev = () => {
    if (!product?.images?.length) return;
    const prevIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setCurrentIndex(prevIndex);
    setActiveImage(product.images[prevIndex]);
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
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    );

  if (!product) return <p className="text-center py-20">Product not found</p>;

  return (
    <>
      <div className="w-full universal_column">
        <div className="w-full fixed_width px-5 py-10 h-full min-h-screen mt-18">
          <div className="w-full flex flex-col sm:flex-col md:flex-row items-stretch gap-10">
            {/* Images */}
            <div className="w-full sm:w-full md:w-[30%] flex flex-col-reverse gap-1">
              <div className="w-full h-[81px] md:h-full flex items-center justify-center gap-1 overflow-auto">
                {product?.images?.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveImage(img);
                      setCurrentIndex(index);
                    }}
                    className={`w-[60px] h-[60px] p-1 border rounded cursor-pointer ${
                      activeImage === img ? "border-black" : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      width={200}
                      height={200}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full h-full flex items-center justify-center">
                {activeImage && (
                  <Image
                    src={activeImage}
                    width={1000}
                    height={1000}
                    alt={product.name}
                    className="object-contain w-full h-full max-h-[300px] md:max-h-[450px] cursor-zoom-in"
                    priority
                    onClick={() => {
                      const idx = product.images.findIndex(
                        (i) => i === activeImage,
                      );
                      setCurrentIndex(idx >= 0 ? idx : 0);
                      setIsViewerOpen(true);
                    }}
                  />
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full sm:w-full md:w-[70%]">
              <h1 className="text-lg sm:text-2xl font-semibold capitalize text-[#931905]">
                {product.name}
              </h1>
              <div className="w-full flex flex-wrap items-center gap-2.5 my-2">
                <p className="pro_p_b_s_B">
                  price : <span className="taka">৳-</span>
                  <strong>
                    {
                      user?.role === "reseller"
                        ? Number(product.resellerPrice).toLocaleString("en-IN") // Reseller price
                        : Number(product.offerPrice).toLocaleString("en-IN") // Customer price
                    }
                  </strong>
                  {/* Show regular price only for customer */}
                  {user?.role !== "reseller" && product.regularPrice > 0 && (
                    <del className="text-[#931905] font-bold">
                      <span className="taka">৳- </span>
                      {Number(product.regularPrice).toLocaleString("en-IN")}
                    </del>
                  )}
                </p>

                <p className="pro_p_b_s_B">
                  brand : <strong>{product.brand}</strong>
                </p>
                <p className="pro_p_b_s_B">
                  Status : <strong>{product.stockStatus}</strong>
                </p>
                <p className="pro_p_b_s_B">
                  Code : <strong>{product.barcode}</strong>
                </p>
              </div>

              {/* Short info */}
              <div className="my-5">
                <p className="text-lg font-medium capitalize mb-2">
                  {product.shortTitle}
                </p>
                <p className="text-base font-normal">
                  {product.shortDescription}
                </p>
                {product.shortList?.length > 0 && (
                  <ul className="list-none text-sm">
                    {product.shortList.map((item) => (
                      <li
                        key={item._id}
                        className="flex items-center gap-5 my-1"
                      >
                        <span className="font-medium w-full max-w-fit">
                          {item.name}
                        </span>
                        <span className="text-gray-700">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Color */}
              <div className="w-full flex flex-wrap items-center gap-2 my-3">
                <span className="font-medium mr-2">Select Color:</span>
                {product?.colors?.map((color, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className={`cursor-pointer duration-300 border ${
                      selectedColor.includes(color)
                        ? "w-5 h-5 rounded-sm"
                        : "w-4 h-4 rounded-full"
                    }`}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  ></div>
                ))}
              </div>

              {/* Offer / Points Badge */}
              {user?.role === "customer" &&
                (hasOffer ? (
                  <div className="w-fit px-3 h-6 rounded-full bg-[#3c3c3c] text-white flex items-center justify-center text-sm font-medium uppercase my-2">
                    {discountPercent}% OFF
                  </div>
                ) : earnedPoints > 0 ? (
                  <div className="w-fit px-3 h-6 rounded-full bg-[#3c3c3c] text-white flex items-center gap-1 text-sm font-medium my-2">
                    Earn Points
                    <span className="text-[#c9c601]">{earnedPoints} ⭐</span>
                  </div>
                ) : null)}

              {/* Quantity */}
              <div className="w-full max-w-fit flex flex-col sm:flex-row md:flex-row items-start justify-start gap-3 my-5">
                <div className="flex items-stretch gap-1.5">
                  <div
                    className="universal w-fit h-8 px-2 border border-[#ddd] cursor-pointer flex items-center justify-center text-sm"
                    onClick={() => handleQuantityChange("dec")}
                  >
                    <FaMinus />
                  </div>
                  <div className="universal w-fit h-8 px-3 border border-[#ddd] font-bold text-sm flex items-center justify-center">
                    {quantity}
                  </div>
                  <div
                    className="universal w-fit h-8 px-2 border border-[#ddd] cursor-pointer flex items-center justify-center text-sm"
                    onClick={() => handleQuantityChange("inc")}
                  >
                    <FaPlus />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!user) {
                      setShowLoginModal(true); // ✅ login popup open
                      return;
                    }
                    handleBuyNow();
                  }}
                  className="buy_btn uppercase"
                >
                  <span className="text-sm">Buy Now</span>
                  <span className="text-sm shop_btn_icon">
                    <GiShoppingBag />
                  </span>
                </button>
              </div>
              {message && (
                <p
                  className={`text-sm mt-1 ${
                    messageType === "error" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Specifications + Related */}
          <div className="w-full mt-5 flex flex-col sm:flex-row md:flex-row gap-2.5 pt-5 border-t border-t-gray-300">
            {/* Specifications */}
            <div className="w-full sm:w-[70%] md:w-[70%] rounded-md">
              <h1 className="text-lg font-bold capitalize text-[#931905] mb-3">
                Specification
              </h1>
              {product.specifications?.length > 0 ? (
                product.specifications.map((spec) => (
                  <div key={spec._id} className="mb-4 pb-3">
                    <h3 className="font-medium text-base capitalize">
                      {spec.title}
                    </h3>
                    <p className="text-base text-gray-600 mb-2">
                      {spec.description}
                    </p>
                    {spec.list?.length > 0 && (
                      <ul className="text-base ml-2">
                        {spec.list.map((item) => (
                          <li key={item._id} className="flex gap-2 mb-1 w-full">
                            <span className="font-medium w-full max-w-fit">
                              {item.name}:
                            </span>
                            <span className="w-full">{item.value}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <p>No specifications available.</p>
              )}

              {/* ================= REVIEW SECTION ================= */}
              <div className="w-full mt-10">
                <div className="w-full flex items-center justify-between gap-1.5">
                  <h2 className="text-xl font-bold text-[#931905]">
                    Reviews ({reviews?.totalReviews || 0})
                    {reviews?.avgRating > 0 && (
                      <span className="ml-3 text-sm text-gray-700">
                        Avg Rating: {reviews.avgRating.toFixed(1)} ⭐
                      </span>
                    )}
                  </h2>

                  {/* Write a Review Button */}
                  {user && (
                    <div className="">
                      <button
                        className="buy_btn"
                        onClick={() => setReviewModalOpen(true)}
                      >
                        <span>Review Us</span>
                        <span className="text-sm shop_btn_icon">
                          <FaPenNib />
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Review List */}
                <div className="flex flex-col gap-4 mt-5">
                  {reviews?.reviews?.length > 0 ? (
                    reviews.reviews.map((rev) => (
                      <div
                        key={rev._id}
                        className="p-3 rounded-md bg-white flex flex-col"
                      >
                        <p className="font-medium text-lg capitalize">
                          {rev.user?.fullName ||
                            rev.user?.resellerName ||
                            "User"}
                        </p>
                        <p className="font-normal text-[10px]">
                          {rev.rating}⭐out of 5
                        </p>
                        <p className="text-gray-700 mt-2">{rev.message}</p>
                        <p className="text-gray-700 text-[10px]">
                          {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              </div>

              {/* ================= REVIEW MODAL ================= */}
              {reviewModalOpen && (
                <div
                  onClick={() => setReviewModalOpen(false)}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white p-5 rounded-md w-full max-w-md flex flex-col relative"
                  >
                    {showThankYou ? (
                      // ✅ Thank You view
                      <div className="flex flex-col items-center justify-center py-12">
                        <h2 className="text-3xl font-bold text-green-600">
                          Thank You!
                        </h2>
                        <p className="mt-2 text-gray-600">
                          Your review has been submitted successfully.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Heading */}
                        <h3 className="text-lg font-bold">Write a Review</h3>

                        <div className="w-full">
                          {/* ❌ Inline message */}
                          {formMessage && (
                            <p
                              className={`text-sm ${
                                formMessageType === "error"
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {formMessage}
                            </p>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <span>Rating:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-2xl cursor-pointer hover:text-yellow-500 duration-300 ${
                                reviewRating >= star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() => setReviewRating(star)}
                            >
                              ★
                            </span>
                          ))}
                        </div>

                        {/* Message */}
                        <textarea
                          className="border p-2 rounded-md w-full"
                          placeholder="Write your review..."
                          value={reviewMessage}
                          onChange={(e) => setReviewMessage(e.target.value)}
                        />

                        {/* Submit */}
                        <button
                          onClick={handleSubmitReview}
                          className="buy_btn mt-3"
                        >
                          Submit
                        </button>
                      </>
                    )}

                    {/* Close button */}
                    <button
                      onClick={() => setReviewModalOpen(false)}
                      className="underline absolute top-2 right-2 text-red-600 cursor-pointer"
                    >
                      <GiCrossMark />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Related products */}
            <div className="w-full sm:w-[30%] md:w-[30%] transform bg-[#2B2A29]/3 backdrop-blur-md p-3 rounded-md min-h-[200px] border-l border-l-gray-300">
              <h1 className="text-center text-lg font-bold capitalize text-[#931905] mb-3 border-b border-b-[#93180531]">
                Related Product
              </h1>
              {relatedProducts.length > 0 ? (
                relatedProducts.map((item) => (
                  <Link
                    key={item._id}
                    href={`/products/${item._id}`}
                    className="w-full flex gap-2.5 items-start shadow-lg hover:shadow-xs transition duration-200 p-2 rounded-sm"
                  >
                    <div className="w-20 h-[60px]">
                      <img
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-base font-medium capitalize">
                        {item.name}
                      </p>
                      <p className="text-sm font-normal flex items-center gap-2.5">
                        <strong>
                          {" "}
                          <span className="taka">৳- </span>
                          {Number(item.offerPrice).toLocaleString("en-IN")}
                        </strong>
                        <del>
                          <span className="taka">৳- </span>
                          {Number(item.regularPrice).toLocaleString("en-IN")}
                        </del>
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center">No related products</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image modal */}
      {isViewerOpen && (
        <div
          onClick={() => setIsViewerOpen(false)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95%] max-w-[700px] h-auto flex items-center justify-center"
          >
            {/* ❌ Close */}
            <button
              className="absolute -top-10 right-0 text-white text-2xl"
              onClick={() => setIsViewerOpen(false)}
            >
              ✕
            </button>

            {/* ⬅️ Prev */}
            {product.images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 text-white text-3xl bg-black/40 hover:bg-black/70 px-3 pt-0.5 pb-2 cursor-pointer"
              >
                ‹
              </button>
            )}

            {/* 🖼 Image */}
            <Image
              src={product.images[currentIndex]}
              alt="image-view"
              width={1200}
              height={1200}
              className="w-full h-auto max-h-[90vh] object-contain"
            />

            {/* ➡️ Next */}
            {product.images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 text-white text-3xl bg-black/40 hover:bg-black/70 px-3 pt-0.5 pb-2 cursor-pointer"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}

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
                className="bg-[#FFCE1B] hover:bg-[#fdc701] py-1 rounded-sm font-semibold text-lg cursor-pointer active:translate-y-1 active:shadow-[0_2px_0_#d1a900] transition-all duration-150"
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
