import Searchresult from "./Searchresult";

export default function Page({ searchParams }) {
  return (
    <>
      <Searchresult
      q={searchParams.q || ""}
      mainCategory={searchParams.mainCategory || ""}
      subCategory={searchParams.subCategory || ""}
    />
    </>
  );
}
