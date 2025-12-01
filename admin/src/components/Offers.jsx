"use client";

import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { uploadImage } from "@/lib/uploadImage";
import { RxCross2 } from "react-icons/rx";

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

export default function Offers() {
  const [images, setImages] = useState([]); // File objects for upload
  const [imagePreviews, setImagePreviews] = useState([]); // data urls for preview (left)
  const [uploadedUrls, setUploadedUrls] = useState([]); // final uploaded URLs (for showing and payload)

  const [form, setForm] = useState({
    name: "",
    brand: "",
    regularPrice: "",
    offerPrice: "",
    offerStartDate: "",
    offerEndDate: "",
    stockStatus: "inStock",
    colors: [],
    shortTitle: "",
    shortDescription: "",
    shortList: [], // {name, value}
    specifications: [], // { title, description, list: [ {name, value} ] }
  });

  // temporary fields for shortList input
  const [shortInput, setShortInput] = useState({ name: "", value: "" });

  // spec inputs
  const [specInput, setSpecInput] = useState({
    title: "",
    description: "",
    list: [],
    listInput: { name: "", value: "" },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ===== Image selection (local preview) =====
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // store File objects
    setImages((prev) => [...prev, ...files]);

    // create previews
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  // remove preview + file at index
  const removeImage = (idx) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setUploadedUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  // ===== Colors toggle (ensure '#' present) =====
  const toggleColor = (hex) => {
    const color = hex.startsWith("#") ? hex : `#${hex}`;
    setForm((prev) => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter((c) => c !== color)
          : [...prev.colors, color],
      };
    });
  };

  // ===== Short list add =====
  const addShortList = () => {
    if (!shortInput.name.trim() || !shortInput.value.trim()) return;
    setForm((prev) => ({
      ...prev,
      shortList: [...prev.shortList, { ...shortInput }],
    }));
    setShortInput({ name: "", value: "" });
  };

  const removeShortList = (i) => {
    setForm((prev) => ({
      ...prev,
      shortList: prev.shortList.filter((_, idx) => idx !== i),
    }));
  };

  // ===== Specification list item add =====
  const addSpecListItem = () => {
    if (!specInput.listInput.name.trim() || !specInput.listInput.value.trim())
      return;
    setSpecInput((prev) => ({
      ...prev,
      list: [...prev.list, prev.listInput],
      listInput: { name: "", value: "" },
    }));
  };

  // add full specification block
  const addSpecification = () => {
    if (!specInput.title.trim() || !specInput.description.trim()) return;
    setForm((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        {
          title: specInput.title,
          description: specInput.description,
          list: [...specInput.list],
        },
      ],
    }));
    setSpecInput({
      title: "",
      description: "",
      list: [],
      listInput: { name: "", value: "" },
    });
  };

  const removeSpecification = (i) => {
    setForm((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, idx) => idx !== i),
    }));
  };

  // ===== Submit: upload images (Cloudinary via uploadImage), then POST payload to backend =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // 1) upload images sequentially (or in parallel) and collect URLs
      const urls = [...(uploadedUrls || [])]; // if some already uploaded
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        // uploadImage MUST return a single string URL (not array)
        const url = await uploadImage(file, "offers");
        // ensure string and push
        if (Array.isArray(url)) {
          urls.push(...url);
        } else {
          urls.push(url);
        }
      }

      // 2) prepare payload
      const payload = {
        name: form.name,
        brand: form.brand,
        regularPrice: Number(form.regularPrice || 0),
        offerPrice: Number(form.offerPrice || 0),
        stockStatus: form.stockStatus,
        colors: form.colors,
        shortTitle: form.shortTitle,
        shortDescription: form.shortDescription,
        shortList: form.shortList,
        specifications: form.specifications,
        offerStartDate: form.offerStartDate,
        offerEndDate: form.offerEndDate,
        images: urls,
      };

      // 3) POST to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Product added to Offers successfully!");
        // reset
        setForm({
          name: "",
          brand: "",
          regularPrice: "",
          offerPrice: "",
          stockStatus: "inStock",
          colors: [],
          shortTitle: "",
          shortDescription: "",
          offerStartDate: "",
          offerEndDate: "",
          shortList: [],
          specifications: [],
        });
        setImages([]);
        setImagePreviews([]);
        setUploadedUrls([]);
      } else {
        setMessage(data.error || "Failed to add offer");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error while adding offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-semibold mb-3">Offers Products</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Left column: image previews */}
        <div className="w-full">
          <div className="flex items-center gap-5">
            <div className="flex gap-2">
              {imagePreviews.length === 0 && (
                <div className="text-sm text-gray-500">No images</div>
              )}
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-16 h-16 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-red-600"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>

            <label className="w-16 h-16 mt-2 inline-flex items-center justify-center cursor-pointer border rounded text-2xl">
              <MdCloudUpload />
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>
        </div>

        {/* Right column: form fields */}
        <div className="w-full flex flex-col gap-3">
          {/* basic info */}
          <div className="flex gap-2">
            <input
              className="flex-1 py-2 px-3 border rounded"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              className="w-52 py-2 px-3 border rounded"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) =>
                setForm((p) => ({ ...p, brand: e.target.value }))
              }
            />
          </div>

          {/* OFFER DATE */}
          <div className="flex gap-2">
            <input
              type="date"
              value={form.offerStartDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  offerStartDate: e.target.value,
                }))
              }
              className="py-1 px-2 border rounded-md w-full"
            />

            <input
              type="date"
              value={form.offerEndDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  offerEndDate: e.target.value,
                }))
              }
              className="py-1 px-2 border rounded-md w-full"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              className="py-2 px-3 border rounded"
              placeholder="Regular Price"
              value={form.regularPrice}
              onChange={(e) =>
                setForm((p) => ({ ...p, regularPrice: e.target.value }))
              }
            />
            <input
              type="number"
              className="py-2 px-3 border rounded"
              placeholder="Offer Price"
              value={form.offerPrice}
              onChange={(e) =>
                setForm((p) => ({ ...p, offerPrice: e.target.value }))
              }
            />
            <select
              className="py-2 px-3 border rounded"
              value={form.stockStatus}
              onChange={(e) =>
                setForm((p) => ({ ...p, stockStatus: e.target.value }))
              }
            >
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          {/* Colors */}
          <div className="border">
            <p className="font-semibold mb-2">Colors</p>
            <div className="flex flex-wrap gap-3">
              {COLOR_LIST.map((c) => {
                const checked = form.colors.includes(c);
                return (
                  <label
                    key={c}
                    className={`flex items-center gap-2 px-2 py-1 border rounded cursor-pointer ${
                      checked ? "bg-gray-100" : ""
                    }`}
                  >
                    <div
                      className="w-5 h-5 border"
                      style={{ backgroundColor: c }}
                    />
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleColor(c)}
                    />
                    <span className="text-xs">{c}</span>
                  </label>
                );
              })}
            </div>

            <p className="text-sm mt-2">
              Selected Colors:{" "}
              {form.colors.length ? form.colors.join(", ") : "None"}
            </p>
          </div>

          {/* Short title & description */}
          <div className="flex flex-col gap-2">
            <input
              className="py-2 px-3 border rounded"
              placeholder="Short Title"
              value={form.shortTitle}
              onChange={(e) =>
                setForm((p) => ({ ...p, shortTitle: e.target.value }))
              }
            />
            <textarea
              className="py-2 px-3 border rounded"
              rows={3}
              placeholder="Short Description"
              value={form.shortDescription}
              onChange={(e) =>
                setForm((p) => ({ ...p, shortDescription: e.target.value }))
              }
            />
          </div>

          {/* Short list */}
          <div className="border p-3 rounded">
            <p className="font-semibold mb-2">Short List</p>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 py-1 px-2 border rounded"
                placeholder="Name"
                value={shortInput.name}
                onChange={(e) =>
                  setShortInput((s) => ({ ...s, name: e.target.value }))
                }
              />
              <input
                className="w-48 py-1 px-2 border rounded"
                placeholder="Value"
                value={shortInput.value}
                onChange={(e) =>
                  setShortInput((s) => ({ ...s, value: e.target.value }))
                }
              />
              <button
                type="button"
                className="py-1 px-3 bg-[#2B2A29] text-white rounded"
                onClick={addShortList}
              >
                Add
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {form.shortList.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{it.name}</span>:{" "}
                    <span>{it.value}</span>
                  </div>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() => removeShortList(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {form.shortList.length === 0 && (
                <div className="text-sm text-gray-500">No items</div>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className="border p-3 rounded">
            <p className="font-semibold mb-2">Specifications</p>

            <div className="w-full flex flex-col gap-2.5">
              <input
                className="w-full py-1 px-2 border rounded mb-1"
                placeholder="Specification Title"
                value={specInput.title}
                onChange={(e) =>
                  setSpecInput((s) => ({ ...s, title: e.target.value }))
                }
              />
              <textarea
                className="w-full py-1 px-2 border rounded mb-2"
                rows={2}
                placeholder="Specification Description"
                value={specInput.description}
                onChange={(e) =>
                  setSpecInput((s) => ({ ...s, description: e.target.value }))
                }
              />
            </div>

            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 py-1 px-2 border rounded"
                placeholder="List Name"
                value={specInput.listInput.name}
                onChange={(e) =>
                  setSpecInput((s) => ({
                    ...s,
                    listInput: { ...s.listInput, name: e.target.value },
                  }))
                }
              />
              <input
                className="w-48 py-1 px-2 border rounded"
                placeholder="List Value"
                value={specInput.listInput.value}
                onChange={(e) =>
                  setSpecInput((s) => ({
                    ...s,
                    listInput: { ...s.listInput, value: e.target.value },
                  }))
                }
              />
              <button
                type="button"
                className="py-1 px-3 bg-[#2B2A29] text-white rounded"
                onClick={addSpecListItem}
              >
                Add
              </button>
            </div>

            <div className="mb-2">
              {specInput.list.map((li, i) => (
                <div key={i} className="text-sm">
                  <strong>{li.name}</strong>: {li.value}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="py-1 px-3 bg-green-600 text-white rounded"
                onClick={addSpecification}
              >
                Add Specification
              </button>
            </div>

            {/* Show added specifications */}
            <div className="mt-3 flex flex-col gap-2">
              {form.specifications.length === 0 && (
                <div className="text-sm text-gray-500">
                  No specifications yet
                </div>
              )}
              {form.specifications.map((sp, idx) => (
                <div key={idx} className="border p-2 rounded">
                  <div className="font-semibold">{sp.title}</div>
                  <div className="text-sm">{sp.description}</div>
                  <div className="mt-1">
                    {sp.list.map((li, i) => (
                      <div key={i} className="text-sm">
                        • <strong>{li.name}</strong>: {li.value}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1">
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => removeSpecification(idx)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-[#2B2A29] text-white rounded"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
            <div className="text-sm text-green-600">{message}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
