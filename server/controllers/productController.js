import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    // save the data into db
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    // We are creating a new product object from productData, which is an instance of the productModel (Mongoose model)
    const product = new productModel(productData);
    // After that save into DB
    await product.save();
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removedProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const filterProducts = async (req, res) => {
  try {
    const { category, subCategory, minPrice, maxPrice, bestseller, sort, search } = req.query;
    let filter = {};
    if (category) {
      filter.category = { $in: category.split(",") };
    }
    if (subCategory) {
      filter.subCategory = { $in: subCategory.split(",") };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (bestseller) {
      filter.bestseller = bestseller === "true";
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" }; // case-insensitive search
    }
    // Base query
    let query = productModel.find(filter);
    // Sorting
    if (sort === "low-high") {
      query = query.sort({ price: 1 });
    } else if (sort === "high-low") {
      query = query.sort({ price: -1 });
    } else {
      query = query.sort({ date: -1 });
    }
    const products = await query.exec();
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const searchProducts = async (req, res) => {
  try {
    const { q } = req.query; 
    if (!q || !q.trim()) {
      return res.json({ success: true, products: [] });
    }
    const regex = new RegExp(q, "i");
    const products = await productModel.find({
      $or: [{ name: regex }, { description: regex }],
    });
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removedProduct, listProduct, singleProduct, filterProducts, searchProducts };
