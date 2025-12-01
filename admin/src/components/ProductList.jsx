"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { uploadImage } from "@/lib/uploadImage"; // যদি image আপডেট করতে চাও

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editProduct, setEditProduct] = useState(null); // Edit Modal
  const [editImages, setEditImages] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        setMessage(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    }
  };

  // Open edit modal
  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setEditImages(product.images || []);
  };

  // Handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle colors toggle
  const toggleColor = (color) => {
    setEditProduct((prev) => {
      const alreadySelected = prev.colors.includes(color);
      return {
        ...prev,
        colors: alreadySelected
          ? prev.colors.filter((c) => c !== color)
          : [...prev.colors, color],
      };
    });
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];
    for (let file of files) {
      const url = await uploadImage(file, "products");
      uploadedUrls.push(url);
    }
    setEditImages((prev) => [...prev, ...uploadedUrls]);
  };

  // Update product API
  const handleUpdate = async () => {
    try {
      const payload = {
        ...editProduct,
        images: editImages,
        regularPrice: Number(editProduct.regularPrice || 0),
        offerPrice: Number(editProduct.offerPrice || 0),
        colors: editProduct.colors,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${editProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("Product updated successfully");
        setEditProduct(null);
        fetchProducts(); // refresh table
      } else {
        setMessage(data.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-3">All Products</h1>

      {message && <p className="mb-3 text-green-600">{message}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Image</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Category</th>
                <th className="border px-2 py-1">Brand</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Stock</th>
                <th className="border px-2 py-1">Colors</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((prod) => (
                  <tr key={prod._id} className="text-center">
                    <td className="border px-2 py-1">
                      {prod.images && prod.images[0] ? (
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 object-cover mx-auto"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border px-2 py-1">{prod.name}</td>
                    <td className="border px-2 py-1">
                      {prod.mainCategory} / {prod.subCategory}
                    </td>
                    <td className="border px-2 py-1">{prod.brand || "-"}</td>
                    <td className="border px-2 py-1">
                      <span className="text-2xl">৳-</span>{prod.offerPrice || prod.regularPrice || 0}/-
                    </td>
                    <td className="border px-2 py-1">
                      {prod.stockStatus === "inStock" ? (
                        <MdCheckCircle className="text-green-600 inline" />
                      ) : (
                        <MdCancel className="text-red-600 inline" />
                      )}
                    </td>
                    <td className="border px-2 py-1">
                      {prod.colors && prod.colors.length > 0
                        ? prod.colors.join(", ")
                        : "-"}
                    </td>
                    <td className="px-2 py-1 flex items-center justify-center gap-2 pt-5">
                      <button
                        onClick={() => handleEdit(prod)}
                        className="text-blue-600 hover:text-blue-800 text-xl"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="text-red-600 hover:text-red-800 text-xl"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-2 py-1 text-center" colSpan={8}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-3/4 max-w-2xl">
            <h2 className="text-xl font-semibold mb-3">Edit Product</h2>

            <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={editProduct.name}
                onChange={handleChange}
                className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={editProduct.brand}
                onChange={handleChange}
                className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  name="regularPrice"
                  placeholder="Regular Price"
                  value={editProduct.regularPrice}
                  onChange={handleChange}
                  className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
                />
                <input
                  type="number"
                  name="offerPrice"
                  placeholder="Offer Price"
                  value={editProduct.offerPrice}
                  onChange={handleChange}
                  className="py-1 px-2 border outline-none border-[#2B2A29] rounded-md"
                />
              </div>

              {/* Stock Status */}
              <div className="flex gap-2">
                {["inStock", "outOfStock", "upcoming"].map((status) => (
                  <label key={status} className="flex items-center gap-1">
                    <input
                      type="radio"
                      checked={editProduct.stockStatus === status}
                      onChange={() =>
                        setEditProduct((prev) => ({ ...prev, stockStatus: status }))
                      }
                    />
                    {status}
                  </label>
                ))}
              </div>

              {/* Colors */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[
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
                ].map((color) => (
                  <label key={color} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 border"
                      style={{ backgroundColor: color }}
                    ></div>
                    <input
                      type="checkbox"
                      checked={editProduct.colors.includes(color)}
                      onChange={() => toggleColor(color)}
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>

              {/* Images */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {editImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="product"
                    className="w-12 h-12 object-cover border"
                  />
                ))}
                <label className="w-12 h-12 flex items-center justify-center rounded-md border border-[#2B2A29] cursor-pointer text-3xl text-[#898383]">
                  +
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3 justify-end">
                <button
                  onClick={() => setEditProduct(null)}
                  className="py-1 px-3 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="py-1 px-3 bg-[#2B2A29] text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
