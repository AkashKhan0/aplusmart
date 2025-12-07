"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Searchresult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    console.log("ENV:", process.env.NEXT_PUBLIC_API_URL);
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?q=${query}`
        );

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    console.log(process.env.NEXT_PUBLIC_API_URL);

    fetchProducts();
  }, [query]);

  if (loading)
    return <p className="text-center py-10">Searching products...</p>;

  return (
    <>
      <div className="w-full h-fit universal">
        <div className="fixed_width h-full min-h-screen px-5 py-10">
          <h2 className="text-xl font-bold mb-5">
            Results for: <span className="text-red-500">{query}</span>
          </h2>

          {products.length === 0 ? (
            <p>No products found!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {products.map((item) => (
                <Link
                  key={item._id}
                  href={`/products/${item._id}`}
                  className="bg-white rounded-md hover:shadow-md cursor-pointer transition p-2"
                >
                  <div className="w-full h-[250px]">
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
                    <p className="text-[#931905] flex gap-3">
                      ৳{item.offerPrice}
                      <del className="text-sm text-[#2B2A29]">
                        ৳{item.regularPrice}
                      </del>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
