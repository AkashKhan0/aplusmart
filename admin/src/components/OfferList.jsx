"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

export default function OfferList() {
  const [offers, setOffers] = useState([]);
  const [editOffer, setEditOffer] = useState(null);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/offers`;

  // ✅ FETCH DATA
  const fetchOffers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setOffers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchOffers();
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    await fetch(`${API}/${editOffer._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editOffer),
    });

    setEditOffer(null);
    fetchOffers();
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">🔥 Offer Product List</h1>

      {/* ================== TABLE ================== */}

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Offer Date</th>
            <th>Reg</th>
            <th>Offer</th>
            <th>Stock</th>
            <th>Colors</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {offers.map((item) => (
            <tr key={item._id} className="text-center border-b">
              <td>
                <img
                  src={item.images?.[0]}
                  className="w-12 h-12 mx-auto object-cover"
                />
              </td>

              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>
                {new Date(item.offerStartDate).toLocaleDateString()}→
                {new Date(item.offerEndDate).toLocaleDateString()}
              </td>

              <td>{item.regularPrice}</td>
              <td className="text-red-600 font-semibold">{item.offerPrice}</td>
              <td>{item.stockStatus}</td>

              <td>
                <div className="flex justify-center gap-1">
                  {item.colors?.map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 border"
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </td>

              {/* ACTION */}
              <td className="flex items-center justify-center gap-3 pt-4 text-xl">
                <FaEdit
                  onClick={() => setEditOffer(item)}
                  className="cursor-pointer text-blue-600"
                />

                <FaTrash
                  onClick={() => handleDelete(item._id)}
                  className="cursor-pointer text-red-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================== EDIT MODAL ================== */}

      {editOffer && (
        <div className="fixed inset-0 bg-black/60 flex flex-col justify-center items-center">
          <div className="bg-white p-5 rounded w-[500px]">
            <h2 className="text-lg mb-2 font-semibold">✏️ Edit Offer</h2>

            <div className="w-full flex items-center gap-2">
                <input
              value={editOffer.name}
              className="w-full border py-1 px-2"
              onChange={(e) =>
                setEditOffer({ ...editOffer, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              value={editOffer.brand}
              className="w-full border py-1 px-2"
              onChange={(e) =>
                setEditOffer({ ...editOffer, brand: e.target.value })
              }
              placeholder="Brand"
            />
            </div>

            <div className="w-full flex items-center gap-2 mt-1">
                <input
              type="date"
              value={editOffer.offerStartDate?.slice(0, 10)}
              onChange={(e) =>
                setEditOffer({
                  ...editOffer,
                  offerStartDate: e.target.value,
                })
              }
              className="w-full border py-1 px-2"
            />

            <input
              type="date"
              value={editOffer.offerEndDate?.slice(0, 10)}
              onChange={(e) =>
                setEditOffer({
                  ...editOffer,
                  offerEndDate: e.target.value,
                })
              }
              className="w-full border py-1 px-2"
            />
            </div>

            <div className="w-full flex items-center gap-2 mt-1">
                <input
              type="number"
              value={editOffer.regularPrice}
              className="w-full border py-1 px-2"
              onChange={(e) =>
                setEditOffer({
                  ...editOffer,
                  regularPrice: e.target.value,
                })
              }
            />

            <input
              type="number"
              value={editOffer.offerPrice}
              className="w-full border py-1 px-2"
              onChange={(e) =>
                setEditOffer({
                  ...editOffer,
                  offerPrice: e.target.value,
                })
              }
            />

            <select
              value={editOffer.stockStatus}
              onChange={(e) =>
                setEditOffer({
                  ...editOffer,
                  stockStatus: e.target.value,
                })
              }
              className="w-full border py-1 px-2"
            >
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="upcoming">Upcoming</option>
            </select>
            </div>

            {/* BUTTONS */}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditOffer(null)}
                className="px-3 py-1 border"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-600 text-white flex items-center gap-1"
              >
                <FaSave /> Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
