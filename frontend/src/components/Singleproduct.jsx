"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Singleproduct() {
  const { id } = useParams();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Load product
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`${API}/api/products/${id}`);
        const data = await res.json();
        const productData = data.product || {};
        const related = data.relatedProducts || [];

        setProduct(productData);
        setRelatedProducts(related);

        if (productData?.images?.length > 0) {
          setActiveImage(productData.images[0]);
        }
      } catch (err) {
        console.error("LOAD FAILED:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading product...</p>;
  if (!product) return <p className="text-center py-20">Product not found</p>;

  return (
    <>
      <div className="w-full universal_column">
        <div className="w-full fixed_width px-5 py-10 h-full min-h-screen">
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
                  price : <strong>{product.offerPrice}</strong>
                  <del className="text-[#931905]">{product.regularPrice}</del>
                  <span className="taka">৳</span>
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
                        <span className="font-medium w-fit sm:w-[120px] md:w-[120px]">
                          {item.name}
                        </span>
                        <span className="text-gray-700">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Color section */}
              <div className="w-full flex flex-wrap items-center gap-2">
                <div className="text-base font-medium capitalize">
                  available color :
                </div>
                {product?.colors?.map((color, index) => (
                  <div
                    key={index}
                    title={color}
                    style={{ backgroundColor: color }}
                    className="w-5 h-5 rounded-full border"
                  ></div>
                ))}
              </div>

              {/* status section */}
              <div className="w-full flex items-center mt-2">
                <p className="w-fit flex items-center gap-2 capitalize font-bold">
                  {product.stockStatus}
                  <span
                    className={`w-3 h-3 rounded-full ${
                      product.stockStatus === "inStock"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  ></span>
                </p>
              </div>
            </div>
          </div>

          {/* Specifications + Related */}
          <div className="w-full mt-5">
            <div className="w-full flex items-stretch gap-2.5">
              {/* Specifications */}
              <div className="w-full sm:w-[70%] md:w-[70%] bg-[#FFFFFF] p-3 rounded-md">
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
                            <li key={item._id} className="flex gap-2 mb-1">
                              <span className="font-medium w-[120px]">
                                {item.name}:
                              </span>
                              <span>{item.value}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No specifications available.</p>
                )}
              </div>

              {/* Related products */}
              <div className="w-full sm:w-[30%] md:w-[30%] bg-[#FFFFFF] p-3 rounded-md h-fit min-h-[200px]">
                <div className="w-full">
                  <h1 className="text-center text-lg font-bold capitalize text-[#931905] mb-3">
                    Related Product
                  </h1>
                  {relatedProducts.length > 0 ? (
                    relatedProducts.map((item) => (
                      <Link
                        key={item._id}
                        href={`/products/${item._id}`}
                        className="w-full flex gap-2.5 items-start shadow-lg transition duration-200 p-2 rounded-sm"
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
                            <strong>৳ {item.offerPrice}</strong>
                            <del>৳ {item.regularPrice}</del>
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
