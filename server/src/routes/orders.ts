import express from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const ordersSummaries = await prisma.ordersSummary.findMany({
      include: {
        orders: {
          include: {
            product: true,
          },
        },
        user: true, // Includes the related 'orders' for each 'ordersSummary'
      },
    });
    // Accessing 'orders' data from each 'ordersSummary'
    const ordersData = ordersSummaries.map((summary) => {
      return {
        id: summary.id,
        paymentMethod: summary.paymentMethod,
        userId: summary.userId,
        username: summary.user.username,
        totalPrice: summary.totalPrice,
        createdAt: summary.createdAt,
        orders: summary.orders.map((order) => ({
          id: order.id,
          productId: order.productId,
          size: order.size,
          temperature: order.temperature,
          moddedPrice: order.moddedPrice,
          productName: order.product.name,
        })),
      };
    });

    res.json(ordersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top products" });
  }
});

// Top products
router.get("/top", async (req, res) => {
  try {
    const total = await prisma.order.groupBy({
      by: ["productId"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc", // or "asc" for ascending order
        },
      },
      take: 3,
    });

    const products = await prisma.product.findMany({
      where: {
        id: { in: total.map((item) => item.productId) },
      },
    });

    // Create a mapping of products by their ID for easy lookup
    const productMap = Object.fromEntries(
      products.map((product) => [product.id, product])
    );

    // Order the products according to the order in total
    const orderedProducts = total.map((item) => ({
      productId: item.productId,
      count: item._count.id,
      productDetails: productMap[item.productId], // Retrieve product details using the map
    }));

    res.json(orderedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top products" });
  }
});

router.get("/topweek", async (req, res) => {
  try {
    const lastMonth = new Date();

    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const orderSummariesLastWeek = await prisma.ordersSummary.findMany({
      where: {
        createdAt: {
          gte: lastMonth, // Get orders created in the last week
        },
      },
      select: {
        id: true, // Select only the id to use for filtering orders
      },
    });

    // Extract the orderSummaryIds
    const orderSummaryIds = orderSummariesLastWeek.map((summary) => summary.id);

    const total = await prisma.order.groupBy({
      by: ["productId"],
      _count: {
        id: true,
      },
      where: {
        ordersSummaryId: { in: orderSummaryIds }, // Filter orders by orderSummaryIds from last week
      },
      orderBy: {
        _count: {
          id: "desc", // Order by count descending
        },
      },
      take: 3,
    });

    // Fetch products based on the productIds obtained from total
    const products = await prisma.product.findMany({
      where: {
        id: { in: total.map((item) => item.productId) },
      },
    });

    // Create a mapping of products by their ID for easy lookup
    const productMap = Object.fromEntries(
      products.map((product) => [product.id, product])
    );

    // Order the products according to the order in total
    const orderedProducts = total.map((item) => ({
      productId: item.productId,
      count: item._count.id,
      productDetails: productMap[item.productId], // Retrieve product details using the map
    }));

    res.json(orderedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top products" });
  }
});

const getBreakdown = async () => {
  // Group orders by productId and count them
  const orderCountsByProduct = await prisma.order.groupBy({
    by: ["productId"],
    _count: { productId: true },
  });

  // Sort product counts in descending order
  const sortedOrderCountsByProduct = orderCountsByProduct.sort(
    (a, b) => b._count.productId - a._count.productId
  );

  // Group by userId in the orderSummary table and count, including usernames
  const userCounts = await prisma.ordersSummary.groupBy({
    by: ["userId"],
    _count: { userId: true },
  });

  // Fetch usernames for each userId
  const userWithNames = await Promise.all(
    userCounts.map(async (user) => {
      const userDetails = await prisma.user.findUnique({
        where: { id: user.userId },
        select: { id: true, username: true }, // Adjust field name as necessary
      });

      return {
        userId: user.userId,
        username: userDetails?.username,
        count: user._count.userId,
      };
    })
  );

  // Sort user counts by count in descending order
  const sortedUserCounts = userWithNames.sort((a, b) => b.count - a.count);

  // Group by paymentMethod in the orderSummary table and count
  const paymentMethodCounts = await prisma.ordersSummary.groupBy({
    by: ["paymentMethod"],
    _count: { paymentMethod: true },
  });

  // Sort payment method counts in descending order
  const sortedPaymentMethodCounts = paymentMethodCounts.sort(
    (a, b) => b._count.paymentMethod - a._count.paymentMethod
  );

  // Fetch product details (like category) for each productId
  const productDetails = await Promise.all(
    sortedOrderCountsByProduct.map(async (order) => {
      const product = await prisma.product.findUnique({
        where: { id: order.productId },
        select: { id: true, name: true, image: true, category: true },
      });

      return {
        productId: order.productId,
        category: product?.category,
        count: order._count.productId,
        name: product?.name,
        image: product?.image,
      };
    })
  );

  // Combine the product breakdown with the separate user and payment method counts
  return {
    productDetails,
    userCounts: sortedUserCounts,
    paymentMethodCounts: sortedPaymentMethodCounts.map((method) => ({
      paymentMethod: method.paymentMethod,
      count: method._count.paymentMethod,
    })),
  };
};

// Usage in the route
router.get("/breakdown", async (req, res) => {
  try {
    const breakdown = await getBreakdown();
    res.json(breakdown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product breakdown" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const orderSummary: any[] = [];
    const { paymentMethod, totalPrice, user, createdAt, orders } = req.body;

    // Save the order summary
    const getUserId = await prisma.user.findFirst({
      where: {
        username: user,
      },
    });

    const product = await prisma.product.findFirst({
      where: {
        name: { in: orders.map((order: any) => order.productName) },
      },
    });

    // Prepare orders with adjusted prices
    const toOrder = orders.map((order: any) => {
      const size = order.size;
      const temperature = order.temperature;
      const moddedPrice = order.moddedPrice;

      return {
        size,
        temperature,
        moddedPrice,
        productId: product?.id,
      };
    });

    // Save the order summary
    const sendthis = {
      paymentMethod: paymentMethod,
      userId: getUserId?.id,
      totalPrice: totalPrice,
      createdAt: createdAt,
      orders: toOrder,
    };

    const createOrder = await prisma.ordersSummary.create({
      data: {
        paymentMethod: paymentMethod,
        user: { connect: { id: getUserId?.id } },
        totalPrice: totalPrice,
        createdAt: createdAt,
        orders: {
          create: toOrder,
        },
      },
      include: {
        orders: true,
      },
    });

    orderSummary.push(createOrder);
    console.log("Order Summary:", createOrder);

    // Export the content of orderSummaries to a JSON file
    const exportFilePath = path.join(
      __dirname,
      "../../seeded_file/orders_summary_seeded.json"
    );

    // Convert existing content to an array
    let existingData = [];
    if (fs.existsSync(exportFilePath)) {
      const existingContent = fs.readFileSync(exportFilePath, "utf-8");
      existingData = JSON.parse(existingContent);
    }

    // Merge existing data with new data
    const combinedData = [...existingData, ...orderSummary];

    // Write combined data back to the file
    fs.writeFileSync(
      exportFilePath,
      JSON.stringify(combinedData, null, 2),
      "utf-8"
    );
    console.log(`Order summaries exported to ${exportFilePath}`);

    return res.json({
      message: "this is successful",
      product,
    });
  } catch (error) {
    console.error("Failed to save order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

export default router;
