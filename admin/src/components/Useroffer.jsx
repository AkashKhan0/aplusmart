"use client";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/uploadImage";

export default function Useroffer() {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    image: "",
    title: "",
    subtitle: "",
    buttonUrl: "",
  });



  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/api/user-offers`;

  const fetchOffers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setOffers(data);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleImageUpload = async (file) => {
    setLoading(true);
    const url = await uploadImage(file, "useroffers");
    setForm({ ...form, image: url });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        buttonUrl: form.buttonUrl,
        image: Array.isArray(form.image) ? form.image[0] : form.image, // ✅ FIX
      };

      const res = await fetch(editingId ? `${API}/${editingId}` : API, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // throw new Error(data.error || "Failed to save offer");
        setMessage("Something Wrong! Try again")
      }

      setMessage(
        editingId
          ? "Offer updated successfully ✅"
          : "Offer added successfully ✅"
      );

      setTimeout(() => {
        setMessage("");
      }, 2000);

      setForm({
        image: "",
        title: "",
        subtitle: "",
        buttonUrl: "",
      });

      setEditingId(null);
      fetchOffers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (offer) => {
    setForm({
      image: offer.image,
      title: offer.title,
      subtitle: offer.subtitle,
      buttonUrl: offer.buttonUrl,
    });
    setEditingId(offer._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchOffers();
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-5">User Offer Carousel</h1>

      <form onSubmit={handleSubmit} className="w-full mb-2">
        <input
          type="file" required
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="mb-2"
        />

        <div className="flex items-center gap-2 mb-2">
          <input required
            className="border p-2 w-full"
            placeholder="Offer Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input required
            className="border p-2 w-full"
            placeholder="Offer Subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
          <input required
            className="border p-2 w-full"
            placeholder="Button URL"
            value={form.buttonUrl}
            onChange={(e) => setForm({ ...form, buttonUrl: e.target.value })}
          />
          <div className="w-full flex justify-end">
            <button className="bg-black text-white px-4 py-2">
              {loading ? "Saving..." : editingId ? "Update Offer" : "Add Offer"}
            </button>
          </div>
        </div>
      </form>
      <div className="w-full my-2">
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <div className="w-full">
        {offers.map((offer) => (
          <div key={offer._id} className="w-full flex items-center justify-between gap-5 border mb-2">
            <img src={offer.image} className="object-cover w-10 h-10" />
            <div className=" flex items-center gap-3 w-full">
                <h2 className="font-bold">{offer.title}</h2>
            <p>{offer.subtitle}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(offer)}
                className="bg-yellow-500 px-3 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(offer._id)}
                className="bg-red-600 text-white px-3 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
