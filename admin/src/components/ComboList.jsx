"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ComboList() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/combos`;

  const [combos, setCombos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= FETCH
  const fetchCombos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setCombos(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  // ================= OPEN EDIT
  const openEdit = (data) => {
    setEditing(data._id);
    setForm({
      name: data.name,
      brand: data.brand,
      regularPrice: data.regularPrice,
      offerPrice: data.offerPrice,
      stockStatus: data.stockStatus,
      colors: data.colors,
      offerStartDate: data.offerStartDate?.slice(0,10),
      offerEndDate: data.offerEndDate?.slice(0,10),
      images: data.images,
    });
  };

  // ================= CLOSE MODAL
  const closeEdit = () => {
    setEditing(null);
    setForm({});
  };

  // ================= INPUT HANDLE
  const updateField = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  // ================= COLOR TOGGLE
  const toggleColor = (hex) => {
    setForm(prev => ({
      ...prev,
      colors: prev.colors.includes(hex)
        ? prev.colors.filter(c => c !== hex)
        : [...prev.colors, hex],
    }));
  };

  // ================= UPDATE
  const updateCombo = async () => {
    setLoading(true);

    const res = await fetch(`${API}/${editing}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      await fetchCombos();
      closeEdit();
    }

    setLoading(false);
  };

  // ================= DELETE
  const deleteCombo = async (id) => {
    if (!confirm("Delete this combo product?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });

    fetchCombos();
  };

  // ================= RENDER
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Combo Product List
      </h1>

      {/* ================= TABLE */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-1 border">Image</th>
            <th className="py-1 border">Name</th>
            <th className="py-1 border">Brand</th>
            <th className="py-1 border">Regular</th>
            <th className="py-1 border">Offer</th>
            <th className="py-1 border">Offer Date</th>
            <th className="py-1 border">Colors</th>
            <th className="py-1 border">Status</th>
            <th className="py-1 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {combos.map((p) => (
            <tr key={p._id} className="text-sm text-center">
              <td className="border">
                <img
                  src={p.images?.[0]}
                  className="w-14 h-14 mx-auto rounded object-cover border"
                />
              </td>

              <td className="border p-1">{p.name}</td>
              <td className="border p-1">{p.brand}</td>
              <td className="border p-1">৳ {p.regularPrice}</td>
              <td className="border p-1">৳ {p.offerPrice}</td>

              <td className="border p-1 text-xs">
                {new Date(p.offerStartDate).toLocaleDateString()} →  
                {new Date(p.offerEndDate).toLocaleDateString()}
              </td>

              <td className="border p-1">
                <div className="flex gap-1 justify-center flex-wrap">
                  {p.colors.map((c,i)=>(
                    <span
                      key={i}
                      className="w-4 h-4 border"
                      style={{background:c}}
                    />
                  ))}
                </div>
              </td>

              <td className="border p-1">
                <span className="text-green-600 font-medium">
                  {p.stockStatus}
                </span>
              </td>

              <td className="border">
                <div className="flex gap-3 justify-center">
                  <FaEdit
                    className="cursor-pointer text-blue-600"
                    onClick={() => openEdit(p)}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-600"
                    onClick={() => deleteCombo(p._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[420px] p-4 rounded space-y-3">
            <h2 className="text-lg font-semibold mb-2">
              Edit Combo Product
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={e=>updateField("name",e.target.value)}
              className="w-full border px-2 py-1"
            />

            <input
              placeholder="Brand"
              value={form.brand}
              onChange={e=>updateField("brand",e.target.value)}
              className="w-full border px-2 py-1"
            />

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Regular Price"
                className="w-full border px-2 py-1"
                value={form.regularPrice}
                onChange={e=>updateField("regularPrice", e.target.value)}
              />

              <input
                type="number"
                placeholder="Offer Price"
                className="w-full border px-2 py-1"
                value={form.offerPrice}
                onChange={e=>updateField("offerPrice", e.target.value)}
              />
            </div>

            <select
              value={form.stockStatus}
              onChange={e=>updateField("stockStatus",e.target.value)}
              className="w-full border py-1"
            >
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="upcoming">Upcoming</option>
            </select>

            <div className="flex gap-2">
              <input
                type="date"
                value={form.offerStartDate}
                className="w-full border px-2 py-1"
                onChange={e=>updateField("offerStartDate",e.target.value)}
              />

              <input
                type="date"
                value={form.offerEndDate}
                className="w-full border px-2 py-1"
                onChange={e=>updateField("offerEndDate",e.target.value)}
              />
            </div>

            {/* Colors */}
            <div className="flex flex-wrap gap-2">
              {[
                "#000000","#FFFFFF","#FF0000","#1656AD","#401E12",
                "#F0C807","#3C20A3","#00B496"
              ].map((c)=>(
                <div
                  key={c}
                  onClick={()=>toggleColor(c)}
                  className={`w-7 h-7 border cursor-pointer 
                  ${form.colors.includes(c) ? "ring-2 ring-black" : ""}`}
                  style={{background:c}}
                />
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={closeEdit}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={updateCombo}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                {loading ? "Saving..." : "Update"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
