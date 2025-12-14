"use client";

import { useState, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import { uploadImage } from "@/lib/uploadImage";

const COLOR_LIST = [
  "#000000",
  "#FFFFFF",
  "#808080",
  "#008000",
  "#800080",
  "#FF0000",
  "#1656AD",
  "#401E12",
  "#F0C807",
  "#EE0943",
  "#3C20A3",
  "#00B496",
];

export default function Addproduct() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    regularPrice: "",
    offerPrice: "",
    stockStatus: "inStock",
    colors: [],
    shortTitle: "",
    shortDescription: "",
    shortList: [],
    specifications: [],
    mainCategory: "",
    subCategory: "",
  });

  const [shortListInput, setShortListInput] = useState({ name: "", value: "" });
  const [specInput, setSpecInput] = useState({
    title: "",
    description: "",
    list: [],
    listInput: { name: "", value: "" },
  });
  const [message, setMessage] = useState("");

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
      );
      const data = await res.json();

      // mainCategory unique
      const mainCats = [...new Set(data.map((cat) => cat.mainCategory))];
      setMainCategories(mainCats);

      // subCategory unique
      const subCats = [...new Set(data.map((cat) => cat.subCategory))];
      setSubCategories(subCats);
    };

    fetchCategories();
  }, []);

  // Handle image selection
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
    setImages((prev) => [...prev, ...files]);
  };

  // Add color
  const toggleColor = (color) => {
    setProductData((prev) => {
      const alreadySelected = prev.colors.includes(color);

      return {
        ...prev,
        colors: alreadySelected
          ? prev.colors.filter((c) => c !== color)
          : [...prev.colors, color],
          
        };
    });
  };

  // Add short list
  const addShortList = () => {
    if (shortListInput.name && shortListInput.value) {
      setProductData((prev) => ({
        ...prev,
        shortList: [...prev.shortList, shortListInput],
      }));
      setShortListInput({ name: "", value: "" });
    }
  };

  // Add spec list item
  const addSpecListItem = () => {
    if (specInput.listInput.name && specInput.listInput.value) {
      setSpecInput((prev) => ({
        ...prev,
        list: [...prev.list, prev.listInput],
        listInput: { name: "", value: "" },
      }));
    }
  };

  // Add specification
  const addSpecification = () => {
    if (specInput.title) {
      setProductData((prev) => ({
        ...prev,
        specifications: [...prev.specifications, { ...specInput }],
      }));
      setSpecInput({
        title: "",
        description: "",
        list: [],
        listInput: { name: "", value: "" },
      });
    }
  };
  

  // Submit product
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Upload images
    const uploadedImageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const url = await uploadImage(images[i], "products");
      uploadedImageUrls.push(url);
    }

    const flatImages = uploadedImageUrls.flat();

    const payload = {
      ...productData,

      regularPrice: Number(productData.regularPrice || 0),
      offerPrice: Number(productData.offerPrice || 0),
      images: flatImages,
    };

    console.log("CREATE PRODUCT PAYLOAD:", payload);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setMessage("Product added successfully!");

      // Reset all fields
      setImages([]);
      setImagePreviews([]);

      setProductData({
        name: "",
        brand: "",
        regularPrice: "",
        offerPrice: "",
        stockStatus: "inStock",
        colors: [],
        shortTitle: "",
        shortDescription: "",
        shortList: [],
        specifications: [],
        mainCategory: "",
        subCategory: "",
      });
    } else {
      console.error("SERVER ERROR:", data);
      setMessage(data.error || "Something went wrong");
    }
  } catch (error) {
    console.error("CREATE ERROR:", error);
    setMessage("Failed to add product");
  }
};


  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-3">Add Product</h1>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {/* Images */}
        <div className="flex gap-2.5 mb-2">
          {imagePreviews.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="preview"
              className="w-12 h-12 rounded-md object-cover border border-[#2B2A29]"
            />
          ))}
          <label className="w-12 h-12 flex items-center justify-center rounded-md border border-[#2B2A29] cursor-pointer text-3xl text-[#898383]">
            <MdCloudUpload />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Category */}
        <div className="flex gap-2.5 mb-2">
          <select
            className="py-1 px-3"
            value={productData.mainCategory}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                mainCategory: e.target.value,
              }))
            }
          >
            <option value="">Select Main Category</option>
            {mainCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="py-1 px-3"
            value={productData.subCategory}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                subCategory: e.target.value,
              }))
            }
          >
            <option value="">Select Sub Category</option>
            {subCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* offer date setup */}
        <div className="w-full">
          {productData.mainCategory === "offer" && (
  <div className="w-full flex items-center gap-2 my-2">
    <div className="w-full">
      <label className="block mb-1">Offer Start Date:</label>
      <input
        type="date"
        value={productData.offerStartDate || ""}
        onChange={(e) =>
          setProductData((prev) => ({ ...prev, offerStartDate: e.target.value }))
        }
        className="w-full py-1 px-2 border rounded-md"
      />
    </div>
    <div className="w-full">
      <label className="block mb-1">Offer End Date:</label>
      <input
        type="date"
        value={productData.offerEndDate || ""}
        onChange={(e) =>
          setProductData((prev) => ({ ...prev, offerEndDate: e.target.value }))
        }
        className="w-full py-1 px-2 border rounded-md"
      />
    </div>
  </div>
)}
        </div>

        {/* Product info */}
        <div className="w-full flex flex-col gap-2 mb-2">
          <input
            type="text"
            placeholder="Product Name"
            value={productData.name}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
          />
          <input
            type="text"
            placeholder="Brand"
            value={productData.brand}
            onChange={(e) =>
              setProductData((prev) => ({ ...prev, brand: e.target.value }))
            }
            className="w-full py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Regular Price"
              value={productData.regularPrice}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  regularPrice: e.target.value,
                }))
              }
              className="w-full py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
            />
            <input
              type="number"
              placeholder="Offer Price"
              value={productData.offerPrice}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  offerPrice: e.target.value,
                }))
              }
              className="w-full py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
            />
          </div>

          {/* Stock Status */}
          <div className="flex gap-2 mb-2">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="stock"
                checked={productData.stockStatus === "inStock"}
                onChange={() =>
                  setProductData((prev) => ({
                    ...prev,
                    stockStatus: "inStock",
                  }))
                }
              />{" "}
              In Stock
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="stock"
                checked={productData.stockStatus === "outOfStock"}
                onChange={() =>
                  setProductData((prev) => ({
                    ...prev,
                    stockStatus: "outOfStock",
                  }))
                }
              />{" "}
              Out of Stock
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="stock"
                checked={productData.stockStatus === "upcoming"}
                onChange={() =>
                  setProductData((prev) => ({
                    ...prev,
                    stockStatus: "upcoming",
                  }))
                }
              />{" "}
              Upcoming
            </label>
          </div>

          {/* Colors */}
          <div className="flex flex-wrap gap-3 mt-3">
            {COLOR_LIST.map((color) => (
              <label key={color} className="flex items-center gap-2">
                <div className="w-5 h-5 border" style={{ backgroundColor: color }}></div>

                <input
                  type="checkbox"
                  checked={productData.colors.includes(color)}
                  onChange={() => toggleColor(color)}
                />

                <span>{color}</span>
              </label>
            ))}
          </div>

          {/* SHOW SELECTED COLORS */}
          <p className="text-sm mt-2">
            Selected Colors: {productData.colors.join(", ")}
          </p>

          {/* Short description */}
          <div className="flex flex-col gap-2 mb-2">
            <input
              type="text"
              placeholder="Short Title"
              value={productData.shortTitle}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  shortTitle: e.target.value,
                }))
              }
              className="w-full py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
            />
            <textarea
              placeholder="Short Description"
              value={productData.shortDescription}
              onChange={(e) =>
                setProductData((prev) => ({
                  ...prev,
                  shortDescription: e.target.value,
                }))
              }
              className="w-full py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
              rows={4}
            ></textarea>
          </div>

          {/* Short List */}
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="List Name"
              value={shortListInput.name}
              onChange={(e) =>
                setShortListInput((prev) => ({ ...prev, name: e.target.value }))
              }
              className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
            />
            <input
              type="text"
              placeholder="List Value"
              value={shortListInput.value}
              onChange={(e) =>
                setShortListInput((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
              className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
            />
            <button
              type="button"
              onClick={addShortList}
              className="py-1 px-3 bg-[#941A06] text-white uppercase rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-col mb-2">
            {productData.shortList.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <p className="font-semibold">{item.name}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div className="flex flex-col gap-2 mb-2">
            <input
              type="text"
              placeholder="Specification Title"
              value={specInput.title}
              onChange={(e) =>
                setSpecInput((prev) => ({ ...prev, title: e.target.value }))
              }
              className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
            />
            <textarea
              placeholder="Specification Description"
              value={specInput.description}
              onChange={(e) =>
                setSpecInput((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
              rows={4}
            ></textarea>

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="List Name"
                value={specInput.listInput.name}
                onChange={(e) =>
                  setSpecInput((prev) => ({
                    ...prev,
                    listInput: { ...prev.listInput, name: e.target.value },
                  }))
                }
                className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
              />
              <input
                type="text"
                placeholder="List Value"
                value={specInput.listInput.value}
                onChange={(e) =>
                  setSpecInput((prev) => ({
                    ...prev,
                    listInput: { ...prev.listInput, value: e.target.value },
                  }))
                }
                className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
              />
              <button
                type="button"
                onClick={addSpecListItem}
                className="py-1 px-3 bg-[#941A06] text-white uppercase rounded-md"
              >
                Add
              </button>
            </div>

            <button
              type="button"
              onClick={addSpecification}
              className="py-1 px-3 bg-[#941A06] text-white uppercase rounded-md"
            >
              Add Specification
            </button>

            {productData.specifications.map((spec, idx) => (
              <div key={idx} className="flex flex-col gap-1 mb-2">
                <p className="font-semibold">{spec.title}</p>
                <p>{spec.description}</p>
                {spec.list.map((li, i) => (
                  <div key={i} className="flex gap-2">
                    <p className="font-semibold">{li.name}</p>
                    <p>{li.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="py-2 px-3 bg-[#2B2A29] text-white uppercase rounded-md"
        >
          Add Product
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
