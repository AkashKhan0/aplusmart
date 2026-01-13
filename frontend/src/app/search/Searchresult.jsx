"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";

export default function Searchresult({ products, query }) {
  // const searchParams = useSearchParams();

  // const q = searchParams.get("q");
  // const mainCategory = searchParams.get("mainCategory");
  // const subCategory = searchParams.get("subCategory");

  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from API
  // useEffect(() => {
  //   if (!q && !mainCategory && !subCategory) {
  //     setProducts([]);
  //     setLoading(false);
  //     return;
  //   }

  //   setLoading(true);

  //   const fetchProducts = async () => {
  //     try {
  //       let url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?`;
  //       const query = [];

  //       if (q) query.push(`q=${encodeURIComponent(q)}`);
  //       if (mainCategory)
  //         query.push(`mainCategory=${encodeURIComponent(mainCategory)}`);
  //       if (subCategory)
  //         query.push(`subCategory=${encodeURIComponent(subCategory)}`);

  //       url += query.join("&");

  //       // const res = await fetch(url);
  //       const res = await fetch(url, {
  //     cache: "no-store",
  //   });
  //       const data = await res.json();
  //       setProducts(data.products || []);
  //     } catch (err) {
  //       console.log(err);
  //       setProducts([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [q, mainCategory, subCategory]);

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
    <div className="w-full h-fit universal">
      <div className="fixed_width h-full min-h-screen px-5 py-10">
        <h2 className="text-xl font-bold mb-5">
          Results for:{" "}
          <span className="text-red-500">
            {q || mainCategory || subCategory}
          </span>
        </h2>

        {products.length === 0 ? (
          <p>No products found!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {products.map((item) => (
              <Link key={item._id} href={`/products/${item._id}`}>
                <div className="flex flex-col bg-white rounded-md hover:shadow-md cursor-pointer transition relative">
                  {/* % OFF */}
                  {item?.offerPrice > 0 &&
                  item?.regularPrice > 0 &&
                  item.offerPrice < item.regularPrice ? (
                    <div className="w-20 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center justify-center text-sm font-medium uppercase">
                      {Math.round(
                        ((item.regularPrice - item.offerPrice) /
                          item.regularPrice) *
                          100
                      )}
                      % off
                    </div>
                  ) : (
                    item?.offerPrice > 0 && (
                      <div className="w-fit px-2 h-6 rounded-br-full rounded-tr-full bg-[#3c3c3c] text-white absolute top-0 left-0 flex items-center gap-1.5 justify-center text-sm font-medium">
                        Earn Points
                        <span className="text-[#c9c601] flex items-center">
                          {Math.min(Math.floor(item.offerPrice / 100), 500)} ⭐
                        </span>
                      </div>
                    )
                  )}

                  <div className="w-full h-[250px] p-2">
                    <Image
                      src={item.images?.[0]}
                      alt={item.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="w-full flex flex-col items-center py-2 gap-1.5">
                    <h1 className="text-base font-medium text-center capitalize">
                      {item.name}
                    </h1>
                    <p className="text-[#931905] flex items-center gap-1 font-bold">
                      <span className="taka">৳-</span>
                      {Number(item.offerPrice).toLocaleString("en-IN")}
                      {item?.regularPrice > 0 && (
                        <del className="text-sm text-[#2B2A29]">
                          <span className="taka">৳-</span>
                          {Number(item.regularPrice).toLocaleString("en-IN")}
                        </del>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
