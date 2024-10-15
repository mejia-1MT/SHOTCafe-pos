import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// top products
router.get("/total", async (req, res) => {
  const query = req.query.method;

  try {
    const oneMonthAgo = new Date();
    const twoMonthsAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const monthlyRecord = await prisma.ordersSummary.groupBy({
      by: ["createdAt"],
      _sum: {
        totalPrice: true,
      },
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: oneMonthAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const prevRecord = await prisma.ordersSummary.groupBy({
      by: ["createdAt"],
      _sum: {
        totalPrice: true,
      },
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: twoMonthsAgo,
          lt: oneMonthAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Calculate total and totalBefore based on query
    let total;
    let totalBefore;

    if (query === "sales") {
      total = monthlyRecord.reduce(
        (sum, record) => sum + (record._sum.totalPrice || 0),
        0
      );
      totalBefore = prevRecord.reduce(
        (sum, record) => sum + (record._sum.totalPrice || 0),
        0
      );
    } else if (query === "transaction") {
      total = monthlyRecord.reduce(
        (count, record) => count + (record._count.id || 0),
        0
      );
      totalBefore = prevRecord.reduce(
        (count, record) => count + (record._count.id || 0),
        0
      );
    } else if (query === "average") {
      const totalSales = monthlyRecord.reduce(
        (sum, record) => sum + (record._sum.totalPrice || 0),
        0
      );
      const totalCustomers = monthlyRecord.reduce(
        (count, record) => count + (record._count.id || 0),
        0
      );
      total = totalCustomers > 0 ? totalSales / totalCustomers : 0;

      const prevTotalSales = prevRecord.reduce(
        (sum, record) => sum + (record._sum.totalPrice || 0),
        0
      );
      const prevTotalCustomers = prevRecord.reduce(
        (count, record) => count + (record._count.id || 0),
        0
      );
      totalBefore =
        prevTotalCustomers > 0 ? prevTotalSales / prevTotalCustomers : 0;
    } else {
      // Handle unknown query type or provide default response
      total = null;
      totalBefore = null;
    }

    // Prepare the response object
    const response = {
      monthlyRecord, // Records grouped by day for the current month
      total, // Total for the current month (sales or transactions or average based on query type)
      totalBefore, // Total for the previous month (sales or transactions or average based on query type)
    };

    // Output or further process the detailed records
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// get specific id
router.get("/bar", async (req, res) => {
  interface Order {
    createdAt: string; // ISO 8601 string
    totalPrice: number; // Assuming this is a string, otherwise adjust the type
  }

  interface MonthlyTotals {
    [month: string]: number;
  }

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6); // Subtract 6 months

    // Convert to ISO strings for the query
    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();

    // Step 2: Query the data
    const orders = await prisma.ordersSummary.findMany({
      where: {
        createdAt: {
          gte: startDateISO,
          lt: endDateISO,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Step 3: Group by month and calculate the sum of totalPrice
    const monthlyTotals = orders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toISOString().slice(0, 7); // Format as YYYY-MM

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += order.totalPrice; // Ensure totalPrice is a number
      return acc;
    }, {} as MonthlyTotals);

    res.json(monthlyTotals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
