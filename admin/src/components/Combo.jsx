"use client";

import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { uploadImage } from "@/lib/uploadImage";
import { RxCross2 } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";

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

export default function Combo() {
  const [images, setImages] = useState([]); // File objects to upload
  const [imagePreviews, setImagePreviews] = useState([]); // local previews
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    regularPrice: "",
    offerPrice: "",
    stockStatus: "inStock",
    colors: [],
    shortTitle: "",
    shortDescription: "",
    shortList: [], // [{name, value}]
    specifications: [], // [{title, description, list: [{name,value}]}]
    offerStartDate: "",
    offerEndDate: "",
  });

  // ---------- Image selection & preview ----------
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- Colors ----------
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

  // ---------- Short list helpers ----------
  const addShortListItem = () => {
    setForm((prev) => ({
      ...prev,
      shortList: [...prev.shortList, { name: "", value: "" }],
    }));
  };

  const updateShortListItem = (idx, key, val) => {
    const list = [...form.shortList];
    list[idx][key] = val;
    setForm((prev) => ({ ...prev, shortList: list }));
  };

  const removeShortListItem = (idx) => {
    setForm((prev) => ({
      ...prev,
      shortList: prev.shortList.filter((_, i) => i !== idx),
    }));
  };

  // ---------- Specifications helpers ----------
  const addSpecification = () => {
    setForm((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        { title: "", description: "", list: [] },
      ],
    }));
  };

  const updateSpecification = (specIdx, key, val) => {
    const specs = [...form.specifications];
    specs[specIdx][key] = val;
    setForm((prev) => ({ ...prev, specifications: specs }));
  };

  const removeSpecification = (specIdx) => {
    setForm((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== specIdx),
    }));
  };

  const addSpecListItem = (specIdx) => {
    const specs = [...form.specifications];
    specs[specIdx].list.push({ name: "", value: "" });
    setForm((prev) => ({ ...prev, specifications: specs }));
  };

  const updateSpecListItem = (specIdx, itemIdx, key, val) => {
    const specs = [...form.specifications];
    specs[specIdx].list[itemIdx][key] = val;
    setForm((prev) => ({ ...prev, specifications: specs }));
  };

  const removeSpecListItem = (specIdx, itemIdx) => {
    const specs = [...form.specifications];
    specs[specIdx].list = specs[specIdx].list.filter((_, i) => i !== itemIdx);
    setForm((prev) => ({ ...prev, specifications: specs }));
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Upload images sequentially (safe)
      const uploadedUrls = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadImage(images[i], "combos"); // should return single URL string (or array handled)
        if (Array.isArray(url)) uploadedUrls.push(...url);
        else uploadedUrls.push(url);
      }

      // Prepare payload
      const payload = {
        ...form,
        regularPrice: Number(form.regularPrice || 0),
        offerPrice: Number(form.offerPrice || 0),
        images: uploadedUrls,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/combos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Combo Offer saved successfully ✅");
        // reset form
        setForm({
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
          offerStartDate: "",
          offerEndDate: "",
        });
        setImages([]);
        setImagePreviews([]);
      } else {
        setMessage(data.error || "Failed to save combo");
      }
    } catch (err) {
      console.error("Combo save error:", err);
      setMessage("Server error while saving combo");
    } finally {
      setLoading(false);
    }
  };

  // ---------- small helpers for inputs ----------
  const setField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  // ---------- Render ----------
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add Combo Offer</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Left column — image previews */}
        <div className="w-full">
          <p className="font-semibold mb-2">Selected Images</p>
          <div className="flex items-center gap-3">
            {imagePreviews.length === 0 && (
              <div className="w-16 h-16 border rounded text-4xl text-gray-500 flex items-center justify-center">
                <CiImageOn />
              </div>
            )}

            {imagePreviews.map((src, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <img
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-16 h-16 object-cover border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="text-red-600 text-sm"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}

            <label className="mt-2 inline-flex items-center gap-2 cursor-pointer border rounded px-3 py-2">
              <MdCloudUpload className="text-xl" />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>
        </div>

        {/* Right column — form fields */}
        <div className="w-full flex flex-col gap-4">
          {/* Name, Brand */}
          <div className="flex gap-2">
            <input
              className="py-2 px-3 border rounded w-full"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
            <input
              className="py-2 px-3 border rounded w-full"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setField("brand", e.target.value)}
            />
          </div>

          {/* Prices and stock */}
          <div className="flex gap-2 w-full">
            <input
              type="number"
              className="py-2 px-3 border rounded w-full"
              placeholder="Regular Price"
              value={form.regularPrice}
              onChange={(e) => setField("regularPrice", e.target.value)}
            />
            <input
              type="number"
              className="py-2 px-3 border rounded w-full"
              placeholder="Offer Price"
              value={form.offerPrice}
              onChange={(e) => setField("offerPrice", e.target.value)}
            />
            <select
              className="py-2 px-3 border rounded w-full"
              value={form.stockStatus}
              onChange={(e) => setField("stockStatus", e.target.value)}
            >
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          {/* Offer date range */}
          <div className="flex gap-2">
            <label className="flex-1">
              <div className="text-sm text-gray-600">Offer Start Date</div>
              <input
                type="date"
                className="w-full py-2 px-3 border rounded"
                value={form.offerStartDate}
                onChange={(e) => setField("offerStartDate", e.target.value)}
                required
              />
            </label>

            <label className="flex-1">
              <div className="text-sm text-gray-600">Offer End Date</div>
              <input
                type="date"
                className="w-full py-2 px-3 border rounded"
                value={form.offerEndDate}
                onChange={(e) => setField("offerEndDate", e.target.value)}
                required
              />
            </label>
          </div>

          {/* Colors */}
          <div>
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
              onChange={(e) => setField("shortTitle", e.target.value)}
            />
            <textarea
              className="py-2 px-3 border rounded"
              placeholder="Short Description"
              rows={3}
              value={form.shortDescription}
              onChange={(e) => setField("shortDescription", e.target.value)}
            />
          </div>

          {/* Short List */}
          <div className="border p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Short List</p>
              <button
                type="button"
                onClick={addShortListItem}
                className="text-sm py-1 px-2 border rounded"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {form.shortList.length === 0 && (
                <div className="text-sm text-gray-500">No items</div>
              )}
              {form.shortList.map((it, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    className="w-full py-1 px-2 border rounded"
                    placeholder="Name"
                    value={it.name}
                    onChange={(e) =>
                      updateShortListItem(idx, "name", e.target.value)
                    }
                  />
                  <input
                    className="w-full py-1 px-2 border rounded"
                    placeholder="Value"
                    value={it.value}
                    onChange={(e) =>
                      updateShortListItem(idx, "value", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="text-red-600 border px-2 py-1"
                    onClick={() => removeShortListItem(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="border p-3 rounded">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Specifications</p>
              <button
                type="button"
                onClick={addSpecification}
                className="text-sm py-1 px-2 border rounded"
              >
                + Add Section
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {form.specifications.length === 0 && (
                <div className="text-sm text-gray-500">No specifications</div>
              )}

              {form.specifications.map((spec, sIdx) => (
                <div key={sIdx} className="border p-3 rounded space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <input
                        className="w-full py-1 px-2 border rounded mb-1"
                        placeholder="Specification Title"
                        value={spec.title}
                        onChange={(e) =>
                          updateSpecification(sIdx, "title", e.target.value)
                        }
                      />
                      <textarea
                        className="w-full py-1 px-2 border rounded"
                        rows={2}
                        placeholder="Specification Description"
                        value={spec.description}
                        onChange={(e) =>
                          updateSpecification(
                            sIdx,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        className="text-red-600 border py-1 px-2"
                        onClick={() => removeSpecification(sIdx)}
                      >
                        Remove Section
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => addSpecListItem(sIdx)}
                        className="py-1 px-3 border rounded text-sm"
                      >
                        + Add Item
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {spec.list.map((li, liIdx) => (
                        <div key={liIdx} className="flex gap-2 items-center">
                          <input
                            className="w-full py-1 px-2 border rounded"
                            placeholder="Name"
                            value={li.name}
                            onChange={(e) =>
                              updateSpecListItem(
                                sIdx,
                                liIdx,
                                "name",
                                e.target.value
                              )
                            }
                          />
                          <input
                            className="w-full py-1 px-2 border rounded"
                            placeholder="Value"
                            value={li.value}
                            onChange={(e) =>
                              updateSpecListItem(
                                sIdx,
                                liIdx,
                                "value",
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            className="text-red-600 border py-1 px-2"
                            onClick={() => removeSpecListItem(sIdx, liIdx)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {spec.list.length === 0 && (
                        <div className="text-sm text-gray-500">No items</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-[#2B2A29] text-white rounded"
            >
              {loading ? "Saving..." : "Add Combo Offer"}
            </button>

            <div className="text-sm text-green-600">{message}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
