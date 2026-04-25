import dotenv from "dotenv";
import { connectDB } from "../config/connectDB.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const uploadsDir = path.resolve(process.cwd(), "uploads");
    const files = fs
      .readdirSync(uploadsDir)
      .filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
    const pickDistinct = (pool, i) => [
      pool[i % pool.length],
      pool[(i + 1) % pool.length],
    ];
    const byName = (substr) =>
      files.filter((f) => f.toLowerCase().includes(substr.toLowerCase()));

    const baseImages = {
      honey: [
        ...byName("download"),
        ...byName("whatsapp"),
      ],
      hairOils: [
        ...byName("download"),
      ],
      makeup: [
        ...byName("screenshot"),
      ],
      soap: [
        ...byName("veg"),
        ...byName("2.png"),
      ],
      organic: [
        ...byName("veg"),
        ...byName("2.png"),
      ],
      any: files,
    };

    const products = [
      {
        name: "Forest Honey 500g",
        description: ["Raw and pure", "Collected from wild hives"],
        price: 350,
        offerPrice: 299,
        category: "Pure Honey",
        image: [baseImages.honey[0], baseImages.honey[1]],
        inStock: true,
      },
      {
        name: "Wildflower Honey 1kg",
        description: ["Unprocessed nectar", "Rich flavor profile"],
        price: 650,
        offerPrice: 599,
        category: "Pure Honey",
        image: [baseImages.honey[2], baseImages.honey[3]],
        inStock: true,
      },
      {
        name: "Coconut Hair Oil 200ml",
        description: ["Cold-pressed", "Nourishes scalp and hair"],
        price: 240,
        offerPrice: 199,
        category: "Hair Oils",
        image: [baseImages.hairOils[0], baseImages.hairOils[1]],
        inStock: true,
      },
      {
        name: "Organic Lip Balm",
        description: ["Beeswax based", "Moisturizes and protects"],
        price: 180,
        offerPrice: 150,
        category: "Makeup Products",
        image: [baseImages.makeup[0], baseImages.makeup[1]],
        inStock: true,
      },
      {
        name: "Herbal Bath Soap",
        description: ["Handmade", "Infused with neem and tulsi"],
        price: 90,
        offerPrice: 75,
        category: "Soap",
        image: [baseImages.soap[0], baseImages.soap[1]],
        inStock: true,
      },
      {
        name: "Organic Neem Powder 250g",
        description: ["Pure neem leaf powder", "Great for skin and hair"],
        price: 220,
        offerPrice: 199,
        category: "Organic Products",
        image: [baseImages.organic[0], baseImages.organic[1]],
        inStock: true,
      },
    ];

    for (const p of products) {
      const exists = await Product.findOne({ name: p.name });
      if (!exists) {
        await Product.create(p);
        console.log(`Seeded: ${p.name}`);
      } else {
        console.log(`Skipped existing: ${p.name}`);
      }
    }

    const bulkGenerate = async (category, baseName, basePrice, baseOffer, imgs, count = 30) => {
      for (let i = 1; i <= count; i++) {
        const name = `${baseName} ${i}`;
        const exists = await Product.findOne({ name });
        if (exists) continue;
        const price = basePrice + Math.floor(Math.random() * 50);
        const offerPrice = Math.max(baseOffer - Math.floor(Math.random() * 20), Math.floor(baseOffer * 0.8));
        const image = [imgs[i % imgs.length], imgs[(i + 1) % imgs.length]];
        const description = ["Organic", "Premium quality"];
        await Product.create({ name, description, price, offerPrice, category, image, inStock: true });
        console.log(`Seeded: ${name}`);
      }
    };

    await bulkGenerate(
      "Pure Honey",
      "Pure Honey Batch",
      250,
      220,
      baseImages.honey.length ? baseImages.honey : baseImages.any,
      30
    );
    await bulkGenerate(
      "Hair Oils",
      "Herbal Hair Oil",
      180,
      160,
      baseImages.hairOils.length ? baseImages.hairOils : baseImages.any,
      30
    );
    await bulkGenerate(
      "Makeup Products",
      "Organic Makeup",
      200,
      170,
      baseImages.makeup.length ? baseImages.makeup : baseImages.any,
      30
    );
    await bulkGenerate(
      "Soap",
      "Herbal Soap",
      80,
      70,
      baseImages.soap.length ? baseImages.soap : baseImages.any,
      30
    );
    await bulkGenerate(
      "Organic Products",
      "Organic Product",
      150,
      130,
      baseImages.organic.length ? baseImages.organic : baseImages.any,
      30
    );

    const diversifyImages = async (category, pool) => {
      const items = await Product.find({ category });
      for (let i = 0; i < items.length; i++) {
        const p = items[i];
        const image = pickDistinct(pool, i);
        p.image = image;
        await p.save();
      }
      console.log(`Diversified images for ${category}`);
    };
    await diversifyImages(
      "Pure Honey",
      baseImages.honey.length ? baseImages.honey : baseImages.any
    );
    await diversifyImages(
      "Hair Oils",
      baseImages.hairOils.length ? baseImages.hairOils : baseImages.any
    );
    await diversifyImages(
      "Makeup Products",
      baseImages.makeup.length ? baseImages.makeup : baseImages.any
    );
    await diversifyImages(
      "Soap",
      baseImages.soap.length ? baseImages.soap : baseImages.any
    );
    await diversifyImages(
      "Organic Products",
      baseImages.organic.length ? baseImages.organic : baseImages.any
    );
    console.log("Seeding completed.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
