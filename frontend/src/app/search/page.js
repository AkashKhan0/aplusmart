import Searchresult from "./Searchresult";

export default async function Page({ searchParams }) {

  const q = searchParams.q || "";
  const mainCategory = searchParams.mainCategory || "";
  const subCategory = searchParams.subCategory || "";

  let products = [];

  if (q || mainCategory || subCategory) {
    const query = [];
    if (q) query.push(`q=${encodeURIComponent(q)}`);
    if (mainCategory) query.push(`mainCategory=${encodeURIComponent(mainCategory)}`);
    if (subCategory) query.push(`subCategory=${encodeURIComponent(subCategory)}`);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?${query.join("&")}`,
      {
        cache: "no-store", // 🔥 ensures fresh fetch on Vercel
      }
    );

    const data = await res.json();
    products = data.products || [];
  }


  return (
    <>
      <Searchresult products={products} query={q || mainCategory || subCategory} />
    </>
  );
}
