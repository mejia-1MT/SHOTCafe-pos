import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const dataFilePath = path.join(__dirname, "seeds/order_summary.json");
const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

async function main() {
  console.log("Deleting existing products...");
  await prisma.order.deleteMany();
  await prisma.ordersSummary.deleteMany();
  console.log("All existing products have been deleted.");
  // Define size-based price adjustments
  const sizePriceAdjustment: { [key: string]: number } = {
    S: 0,
    M: 20,
    L: 40,
  };

  // Array to store all created order summaries
  const orderSummaries: any[] = [];

  for (const input of data) {
    console.log(`Processing order for user: ${input.user}`);

    // Fetch the user
    const user = await prisma.user.findFirst({
      where: { username: input.user },
    });
    if (!user) {
      console.error(`User not found: ${input.user}`);
      continue;
    }

    // Fetch products and their base prices
    const products = await prisma.product.findMany({
      where: {
        id: { in: input.orders.map((order: any) => order.productId) },
      },
    });

    const productMap = new Map(
      products.map((product) => [product.id, product.price])
    );

    // Prepare orders with adjusted prices
    const orders = input.orders.map((order: any) => {
      const basePrice = productMap.get(order.productId) || 0;
      const sizeAdjustment = sizePriceAdjustment[order.size] || 0;
      const moddedPrice = basePrice + sizeAdjustment;

      return {
        product: { connect: { id: order.productId } },
        size: order.size,
        temperature: order.temperature,
        moddedPrice, // Use the calculated moddedPrice
      };
    });

    // Create OrdersSummary with the calculated orders and specified createdAt timestamp
    const orderSummary = await prisma.ordersSummary.create({
      data: {
        paymentMethod: input.paymentMethod,
        user: { connect: { id: user.id } },
        orders: {
          create: orders,
        },
        totalPrice: orders.reduce(
          (sum: number, order: { moddedPrice: number }) =>
            sum + order.moddedPrice,
          0
        ),
        createdAt: input.createdAt, // Use the specified createdAt timestamp
      },
      include: {
        orders: true,
      },
    });

    // Add the created order summary to the array
    orderSummaries.push(orderSummary);

    console.log("Order Summary:", orderSummary);
  }

  // Export the content of orderSummaries to a JSON file
  const exportFilePath = path.join(
    __dirname,
    "../seeded_file/orders_summary_seeded.json"
  );
  fs.writeFileSync(
    exportFilePath,
    JSON.stringify(orderSummaries, null, 2),
    "utf-8"
  );
  console.log(`Order summaries exported to ${exportFilePath}`);
}

main()
  .catch((e: Error) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
