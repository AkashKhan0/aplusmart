import dbConnect from "@/lib/mongodb";
import Faq from "@/models/Faq";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const item = await Faq.findById(params.id);
    if (!item) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const data = await req.json();
    const updated = await Faq.findByIdAndUpdate(params.id, data, { new: true });
    if (!updated) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Faq.findByIdAndDelete(params.id);
    if (!deleted) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
