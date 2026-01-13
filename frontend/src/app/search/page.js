import Searchresult from "./Searchresult";

export default function Page({ searchParams }) {

  const q = searchParams.q || "";
  const mainCategory = searchParams.mainCategory || "";
  const subCategory = searchParams.subCategory || "";


  return (
    <>
      <Searchresult key={`${q}-${mainCategory}-${subCategory}`} />
    </>
  );
}
