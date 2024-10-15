import express from "express";
import { PrismaClient } from "@prisma/client";
import path, { parse } from "path";
import fs from "fs";

const router = express.Router();
const prisma = new PrismaClient();

// top products
router.get("/top", async (req, res) => {
  try {
    const total = await prisma.order.groupBy({
      by: ["productId"],
      _sum: {
        moddedPrice: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          moddedPrice: "desc",
        },
      },
      take: 3,
    });

    const selected = await prisma.product.findMany({
      where: {
        id: { in: total.map((item) => item.productId) },
      },
    });

    res.json(selected);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch top products" });
  }
});

// all
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/create", async (req, res) => {
  const { name, category, price, image } = req.body;

  try {
    const titleCaseName = name
      .toLowerCase()
      .replace(/(?:^|\s)(\w)/g, (match: String) => match.toUpperCase()) // Capitalize the first letter of each word
      .replace(/\s+/g, ""); // Remove spaces completely

    // Extract the file extension from the Base64 string
    const extension = image.substring(
      "data:image/".length,
      image.indexOf(";base64")
    );

    const parsedPrice = parseInt(price, 10);

    // Form the final image name in Title Case format with extension
    const imageName = `${titleCaseName}.${extension}`;

    // Define the save path
    const savePath = path.join(__dirname, "../../assets/menu", imageName);

    // Remove base64 prefix to get the actual data
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // Convert base64 string to a buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Save the image file
    fs.writeFile(savePath, imageBuffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({ message: "Error saving image" });
      }

      console.log("Image saved as:", imageName);
    });

    try {
      const newProduct = await prisma.product.create({
        data: {
          name: titleCaseName, // Using title case for the name
          price: parsedPrice, // Save the price as an integer
          category: category,
          image: `../assets/menu/${imageName}`,
        },
      });

      return res.status(200).json({
        message: "Product created successfully",
        newProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Failed to create product." });
    }
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ error: "Failed to save product or image." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  console.log("API delete");
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    const all = await prisma.product.findMany({});

    console.log(all);

    return res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
});

// PUT route to update a product
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, image } = req.body;
  console.log("API edit");

  const parsedPrice = parseInt(price, 10);
  try {
    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        category,
        price: parsedPrice,
        image,
      },
    });

    const all = await prisma.product.findMany({});

    console.log(all);

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
});

export default router;
