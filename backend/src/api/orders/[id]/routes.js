import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Order ID is required" }), {
        status: 400,
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Fetch order error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
