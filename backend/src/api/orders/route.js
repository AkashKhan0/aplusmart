import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();
    const { productId, quantity, color, userId } = data;

    if (!productId || !quantity || !color || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // generate 6-8 digit order id
    const orderId = Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      orderId,
      productId,
      quantity,
      color,
      userId,
      createdAt: new Date(),
    };

    // simple JSON file storage for demo, replace with DB
    const filePath = path.join(process.cwd(), "orders.json");
    let orders = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);
      orders = JSON.parse(fileData);
    }
    orders.push(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    return new Response(JSON.stringify({ order: newOrder }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
