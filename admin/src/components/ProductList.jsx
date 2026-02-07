"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { uploadImage } from "@/lib/uploadImage";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [editImages, setEditImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ================= FETCH =================
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      );
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      setMessage("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= SEARCH =================
  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      p.mainCategory?.toLowerCase().includes(term) ||
      p.subCategory?.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term) ||
      p._id?.toLowerCase().includes(term)
    );
  });

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      { method: "DELETE" }
    );
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  // ================= EDIT =================
  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setEditImages(product.images || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const toggleColor = (color) => {
    setEditProduct((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      const url = await uploadImage(file, "products");
      setEditImages((prev) => [...prev, url]);
    }
  };

  const handleUpdate = async () => {
    const payload = {
      ...editProduct,
      images: editImages,
      regularPrice: Number(editProduct.regularPrice || 0),
      offerPrice: Number(editProduct.offerPrice || 0),
      resellerPrice: Number(editProduct.resellerPrice || 0),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${editProduct._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setEditProduct(null);
    fetchProducts();
  };

  // ================= UI =================
  return (
    <div>
      {/* Search */}
      <div className="w-full flex justify-center mb-3">
        <input
          type="search"
          className="w-[50%] border py-1 px-3 rounded-md"
          placeholder="Search by name, category, brand, id..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h1 className="text-2xl font-semibold mb-3">All Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border">Image</th>
                <th className="border">Name</th>
                <th className="border">Category</th>
                <th className="border">Brand</th>
                <th className="border">Price</th>
                <th className="border">Stock</th>
                <th className="border">Colors</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="text-start">
                    <td className="border">
                      {p.images?.[0] && (
                        <img
                          src={p.images[0]}
                          className="w-12 h-12 mx-auto object-cover"
                        />
                      )}
                    </td>
                    <td className="border pl-2">{p.name}</td>
                    <td className="border">
                      {p.mainCategory} / {p.subCategory}
                    </td>
                    <td className="border">{p.brand || "-"}</td>
                    <td className="border flex flex-col">
                     <p><span className="taka">৳- </span>{Number(p.offerPrice || p.regularPrice).toLocaleString("en-IN")}/=</p> 
                      <p><span className="taka">Re- </span>{Number(p.resellerPrice).toLocaleString("en-IN")}/=</p>
                    </td>
                    <td className="border">
                      {p.stockStatus === "inStock" ? (
                        <MdCheckCircle className="text-green-600 mx-auto" />
                      ) : (
                        <MdCancel className="text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="border">
  <div className="flex items-center gap-1.5 flex-wrap">
    {p.colors?.map((color, index) => (
      <span
        key={index}
        title={color}
        className="w-3 h-3 rounded-full border border-black"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
</td>

                    <td className="border">
                      <div className="flex justify-center gap-2">
                        <FaEdit
                          className="cursor-pointer text-blue-600"
                          onClick={() => handleEdit(p)}
                        />
                        <FaTrash
                          className="cursor-pointer text-red-600"
                          onClick={() => handleDelete(p._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="border text-center py-2">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= EDIT MODAL (FULL) ================= */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-[60%] max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3">Edit Product</h2>

            <input
              name="name"
              value={editProduct.name}
              onChange={handleChange}
              className="w-full border p-1 mb-2"
            />

            <div className="flex gap-2 mb-2">
              <input
                name="mainCategory"
                value={editProduct.mainCategory}
                onChange={handleChange}
                className="w-full border p-1"
              />
              <input
                name="subCategory"
                value={editProduct.subCategory}
                onChange={handleChange}
                className="w-full border p-1"
              />
            </div>

            {(editProduct.mainCategory === "offer" ||
              editProduct.subCategory === "offer") && (
              <div className="flex gap-2 mb-2">
                <input
                  type="date"
                  name="offerStartDate"
                  value={
                    editProduct.offerStartDate
                      ? editProduct.offerStartDate.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="border p-1 w-full"
                />
                <input
                  type="date"
                  name="offerEndDate"
                  value={
                    editProduct.offerEndDate
                      ? editProduct.offerEndDate.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="border p-1 w-full"
                />
              </div>
            )}

            <input
              name="brand"
              value={editProduct.brand}
              onChange={handleChange}
              className="w-full border p-1 mb-2"
            />

            <div className="flex gap-2 mb-2">
              <input
                type="number"
                name="regularPrice"
                value={editProduct.regularPrice}
                onChange={handleChange}
                className="border p-1 w-full"
              />
              <input
                type="number"
                name="offerPrice"
                value={editProduct.offerPrice}
                onChange={handleChange}
                className="border p-1 w-full"
              />
              <input
                type="number"
                name="resellerPrice"
                value={editProduct.resellerPrice}
                onChange={handleChange}
                className="border p-1 w-full"
              />
            </div>

            {/* Stock */}
            <div className="flex gap-3 mb-2">
              {["inStock", "outOfStock", "upcoming"].map((s) => (
                <label key={s} className="flex gap-1 items-center">
                  <input
                    type="radio"
                    checked={editProduct.stockStatus === s}
                    onChange={() =>
                      setEditProduct((p) => ({ ...p, stockStatus: s }))
                    }
                  />
                  {s}
                </label>
              ))}
            </div>

            {/* Colors */}
            <div className="flex flex-wrap gap-2 mb-2">
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
              ].map((c) => (
                <label key={c} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={editProduct.colors.includes(c)}
                    onChange={() => toggleColor(c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            {/* Images */}
            <div className="flex gap-2 flex-wrap mb-3">
              {editImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-12 h-12 object-cover border"
                />
              ))}
              <input type="file" multiple onChange={handleImageChange} />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditProduct(null)}>Cancel</button>
              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-1"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
