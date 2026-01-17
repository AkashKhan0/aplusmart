"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { GiCrossMark } from "react-icons/gi";

export default function Singleproduct() {
  const { id } = useParams();
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
        if (user?.role === "reseller") setQuantity(50);
      } catch (err) {
        console.error("LOAD FAILED:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id, user]);

  const handleQuantityChange = (type) => {
    if (!user) {
      if (type === "inc") setQuantity((prev) => prev + 1);
      if (type === "dec") setQuantity((prev) => Math.max(1, prev - 1));
    } else if (user.role === "customer") {
      if (type === "inc") setQuantity((prev) => prev + 1);
      if (type === "dec") setQuantity((prev) => Math.max(1, prev - 1));
    } else if (user.role === "reseller") {
      if (type === "inc") setQuantity((prev) => prev + 50);
      if (type === "dec") setQuantity((prev) => Math.max(50, prev - 50));
    }
  };

  const handleBuyNow = () => {
    if (!user) return;
    if (!selectedColor || selectedColor.length === 0) {
      setMessage("Please select a color!");
      setMessageType("error");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    const cartItem = {
      _id: product._id,
      name: product.name,
      images: product.images,
      offerPrice: product.offerPrice,
      regularPrice: product.regularPrice,
      quantity,
      colors: selectedColor,
      role: user.role,

      // 🔥 NEW (IMPORTANT)
      hasOffer,
      discountPercent,
      earnedPoints,
    };
    addToCart(cartItem);
    setMessage("Added to cart!");
    setMessageType("success");
    setTimeout(() => setMessage(""), 2000);
  };

  const hasOffer =
    product?.offerPrice > 0 &&
    product?.regularPrice > 0 &&
    product.offerPrice < product.regularPrice;

  const discountPercent = hasOffer
    ? Math.round(
        ((product.regularPrice - product.offerPrice) / product.regularPrice) *
          100
      )
    : 0;

  // ✅ UPDATED POINTS LOGIC
  const earnedPoints =
    !hasOffer && product?.offerPrice > 0
      ? Math.min(
          Math.floor((product.offerPrice * (product.quantity || 1)) / 100),
          500
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
      alert("Please select rating and write a message!");
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
        alert("Review submitted!");
        setReviewModalOpen(false);
        setReviewRating(0);
        setReviewMessage("");

        // Refresh reviews
        loadReviews();
      } else {
        alert(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
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
                    onClick={() => setActiveImage(img)}
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
                    onClick={() => setIsViewerOpen(true)}
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
                    {Number(product.offerPrice).toLocaleString("en-IN")}
                  </strong>
                  {product.regularPrice > 0 && (
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
                    className={`w-6 h-6 rounded-full border cursor-pointer ${
                      selectedColor.includes(color)
                        ? "border-black border-2"
                        : "border-gray-300"
                    }`}
                    // onClick={() => setSelectedColor(color)}
                    onClick={() => {
                      if (selectedColor.includes(color)) {
                        // deselect color
                        setSelectedColor(
                          selectedColor.filter((c) => c !== color)
                        );
                      } else {
                        // select color
                        setSelectedColor([...selectedColor, color]);
                      }
                    }}
                    title={color}
                  ></div>
                ))}
              </div>

              {/* Offer / Points Badge */}
              {hasOffer ? (
                <div className="w-fit px-3 h-6 rounded-full bg-[#3c3c3c] text-white flex items-center justify-center text-sm font-medium uppercase my-2">
                  {discountPercent}% OFF
                </div>
              ) : earnedPoints > 0 ? (
                <div className="w-fit px-3 h-6 rounded-full bg-[#3c3c3c] text-white flex items-center gap-1 text-sm font-medium my-2">
                  Earn Points
                  <span className="text-[#c9c601]">{earnedPoints} ⭐</span>
                </div>
              ) : null}

              {/* Quantity */}
              <div className="w-full flex items-center gap-3 my-5">
                <div className="flex items-stretch gap-1.5">
                  <div
                    className="universal w-fit h-8 px-2 border border-[#ddd] cursor-pointer flex items-center justify-center"
                    onClick={() => handleQuantityChange("dec")}
                  >
                    <FaMinus />
                  </div>
                  <div className="universal w-fit h-8 px-3 border border-[#ddd] font-bold text-lg flex items-center justify-center">
                    {quantity}
                  </div>
                  <div
                    className="universal w-fit h-8 px-2 border border-[#ddd] cursor-pointer flex items-center justify-center"
                    onClick={() => handleQuantityChange("inc")}
                  >
                    <FaPlus />
                  </div>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={!user}
                  className={`buy_btn uppercase ${
                    !user ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  buy now
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
          <div className="w-full mt-5 flex gap-2.5 pt-5 border-t border-t-gray-300">
            {/* Specifications */}
            <div className="w-full sm:w-[70%] md:w-[70%] p-3 rounded-md">
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
                        Write a Review
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
                    className="bg-white p-5 rounded-md w-full max-w-md flex flex-col gap-3 relative"
                  >
                    <h3 className="text-lg font-bold mb-2">Write a Review</h3>
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
                    <textarea
                      className="border p-2 rounded-md w-full"
                      placeholder="Write your review..."
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                    />
                    <button onClick={handleSubmitReview} className="buy_btn">
                      Submit
                    </button>
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
                        <strong> <span className="taka">৳- </span>{Number(item.offerPrice).toLocaleString("en-IN")}</strong>                        
                        <del><span className="taka">৳- </span>{Number(item.regularPrice).toLocaleString("en-IN")}</del>
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
          <div className="relative w-[95%] max-w-[700px] h-auto">
            <button
              className="absolute -top-10 right-0 text-white text-2xl"
              onClick={() => setIsViewerOpen(false)}
            >
              ✕
            </button>
            <Image
              src={activeImage}
              alt="image-view"
              width={1200}
              height={1200}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
