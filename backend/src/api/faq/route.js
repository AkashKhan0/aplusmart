import dbConnect from "@/lib/mongodb";
import Faq from "@/models/Faq";


export async function GET() {
  try {
    await dbConnect();
    const items = await Faq.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newItem = await Faq.create(body);
    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
